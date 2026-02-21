/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";
import { NOTION_DATABASE_ID } from "./config";
import { NOTION_API_KEY } from "./config";
import { cache } from "react";
import type { PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

export const revalidate = 3600; // 1 hour

// Counter for generating stable synthetic list-group IDs
let listGroupCounter = 0;

// Initialize the Notion client
export const notion = new Client({
  auth: NOTION_API_KEY
})

// Retrieve published posts from database
export const getPublishedPosts = cache(async (): Promise<PageObjectResponse[]> => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "Automated Publish Check",
        formula: {
          string: {
            equals: "Published"
          }
        },
      },
      sorts: [
        {
          property: "PublishDate",
          direction: "descending",
        },
      ],
    });
    // Filter results to only include PageObjectResponse
    return response.results.filter(
      (page): page is PageObjectResponse => page.object === "page"
    );
  } catch (error) {
    console.error("Error querying Notion database:", error);
    throw error;
  }
});

// Retrieve page from database
export const getPage = cache(async (pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  })
  return response;
});

// Retrieve page from slug
export const getPageFromSlug = cache(async (slug: string): Promise<any> => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: typeof slug === "string" ? slug : "",
        }
      },
    })
    return response.results.length > 0 ? response.results?.[0] : null;
  } catch (error) {
    console.error("Error querying Notion database by slug:", error);
    throw error;
  }
})

// Retrieve all blocks from a page
const MAX_BLOCK_DEPTH = 5;
export const getBlocks = cache(async (blockID: string, depth = 0): Promise<any[]> => {
  const blockId = blockID.replaceAll("-", "");

  let blocks = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  let content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: blocks.next_cursor ?? undefined,
    });
    content = [...content, ...blocks.results];
  }

  const childBlocks: Promise<any>[] = content.map(async (block) => {
    if ('has_children' in block && block.has_children && depth < MAX_BLOCK_DEPTH) {
      const children = await getBlocks(block.id, depth + 1);
      return { ...block, children };
    }
    return block;
  });

  return Promise.all(childBlocks).then((childBlock) => childBlock.reduce((acc, curr) => {
    if (curr.type === 'bulleted_list_item') {
      if (acc[acc.length - 1]?.type === 'bulleted_list') {
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        acc.push({
          id: (++listGroupCounter).toString(),
          type: 'bulleted_list',
          bulleted_list: { children: [curr] },
        });
      }
    } else if (curr.type === 'numbered_list_item') {
      if (acc[acc.length - 1]?.type === 'numbered_list') {
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        acc.push({
          id: (++listGroupCounter).toString(),
          type: 'numbered_list',
          numbered_list: { children: [curr] },
        });
      }
    } else {
      acc.push(curr);
    }
    return acc;
  }, []));
});