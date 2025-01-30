import { Client } from "@notionhq/client";
import { DatabaseObjectResponse, PageObjectResponse, PartialPageObjectResponse, PartialDatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export const revalidate = 3600; // 1 hour

const databaseId = process.env.NOTION_DATABASE_ID ?? '';

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

function getRandomInt(minimum: number, maximum: number) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Retrieve database (published posts only)
export const getDatabase = cache(async (): Promise<Array<PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse>>  => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Automated Publish Check",
        formula: {
          string: {
            equals: "Published"
          }
        },
      }
    });
    return response.results;
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

export const getBlocks = cache(async (blockID: string): Promise<any[]> => {
  const blockId = blockID.replaceAll("-","");
    
  const {results} = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
  });

  const childBlocks = results.map(async (block) => {
    if ('has_children' in block && block.has_children) {
      const children = await getBlocks(block.id);
      return {...block, children}
    }
  })

  return Promise.all(childBlocks).then((blocks) => blocks.reduce((acc: any[], curr: any) => {
      if (curr && curr.type === 'bulleted_list_item') {
        if (acc[acc.length - 1]?.type === 'bulleted_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'bulleted_list',
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === 'numbered_list_item') {
        if (acc[acc.length - 1]?.type === 'numbered_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
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