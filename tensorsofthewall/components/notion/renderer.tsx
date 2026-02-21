/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react';
import Link from 'next/link';

import Text from './text';
import styles from '../../styles/post.module.css';
import Image from 'next/image';
import katex from "katex";

export function renderBlock(block: any) {
  const { type, id } = block;
  const value = block[type];
  if ('rich_text' in value && value.rich_text.length === 0) {
    return (
      <div key={id}>
        <br />
      </div>
    );
  }

  switch (type) {
    case 'paragraph':
      return (
        <p key={id} className={styles.paragraph}>
          <Text title={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 key={id} className={styles.heading1}>
          <Text title={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 key={id} className={styles.heading2}>
          <Text title={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={id} className={styles.heading3}>
          <Text title={value.rich_text} />
        </h3>
      );
    case 'bulleted_list': {
      return (
        <ul className={styles.bulletedList} key={block.id}>
          {value.children.map((child: any) => renderBlock(child))}
        </ul>
      );
    }
    case 'numbered_list': {
      return (
        <ol className={styles.numberedList} key={block.id}>
          {value.children.map((child: any) => renderBlock(child))}
        </ol>
      );
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={block.id} className={styles.listItem}>
          <Text title={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div key={id} className={styles.todo}>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />
            {' '}
            <Text title={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details key={id}>
          <summary className={styles.toggleSummary}>
            <Text title={value.rich_text} />
          </summary>
          <div className="ml-4">
            {Array.isArray(block.children) &&
              block.children.map((child: any) => {
                return (
                  <Fragment key={child.id}>{renderBlock(child)}</Fragment>
                );
              })}
          </div>
        </details>
      );
    case 'child_page':
      return (
        <div className={`${styles.childPage}`} key={block.id}>
          <strong>{value?.title}</strong>
          {block.children.map((child: any) => renderBlock(child))}
        </div>
      );
    case 'image': {
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const altText = Array.isArray(value.caption)
        ? value.caption.map((c: any) => c.plain_text).join(' ')
        : (value.caption || '');

      return (
        <figure key={id} className={styles.figure}>
          <Image
            src={src}
            alt={altText}
            width={560}
            height={420}
            style={{ marginBottom: '1%' }}
            className='mx-auto'
            unoptimized
          />
          {altText && <figcaption className="text-[#9c9c9c] text-center"><Text title={value.caption} /></figcaption>}
        </figure>
      );
    }
    case 'divider':
      return <hr className="h-px my-1 bg-gray-700 border-0" key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre key={id} className={styles.pre}>
          <code className={styles.code_block}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'file': {
      const srcFile = value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure key={id} className={styles.fileFigure}>
          <div className={styles.file}>
            {' '}
            <Link href={srcFile} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case 'bookmark': {
      const href = value.url;
      return (
        <a key={id} href={href} target="_blank" rel="noreferrer noopener" className={styles.bookmark}>
          {href}
        </a>
      );
    }
    case 'table': {
      return (
        <table className={styles.table} style={{ margin: '1% 0' }} key={block.id}>
          <tbody>
            {block.children?.map((child: any, index: number) => {
              const RowElement = value.has_column_header && index === 0 ? 'th' : 'td';
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: { plain_text: any; }, i: any) => (
                    <RowElement key={`${child.id}-cell-${i}`}>
                      <Text title={cell} />
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case 'column_list': {
      return (
        <div className={styles.row} key={block.id} style={{ margin: '2% 0' }}>
          {block.children.map((childBlock: any) => renderBlock(childBlock))}
        </div>
      );
    }
    case 'column': {
      return <div key={block.id}>{block.children.map((child: any) => renderBlock(child))}</div>;
    }
    case 'callout': {
      return (
        <div className={styles.callout} key={block.id}>
          {value.icon && value.icon.emoji ? (
            <span className={styles.calloutEmoji}>
              {value.icon.emoji}
            </span>
          ) : null}
          <Text title={value.rich_text} />
        </div>
      )
    }
    case 'embed': {
      const { url, title } = value;
      return (
        <div className={`${styles.embed} ${styles['responsive-iframe']}`} key={block.id}>
          <iframe
            src={url}
            title={title}
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups"
            allowFullScreen
          />
        </div>
      );
    }
    case 'video': {
      const src = value.type === 'external' ? value.external.url : value.file.url;
      if (value.type == "external") {
        return (
          <div className={`${styles.video} ${styles['responsive-iframe']}`} key={block.id}>
            <iframe
              src={src}
              title={value.caption}
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <div className={styles.video} key={block.id}>
          <video controls width={320} height={240}>
            <source src={src} />
            {/* {title} */}
            <Text title={value.caption} />
          </video>
        </div>
      );
    }
    case 'equation': {
      return <span key={id} className={styles.blockEquation} dangerouslySetInnerHTML={{
        __html: katex.renderToString(value.expression, {
          throwOnError: false,
          displayMode: false,
          output: 'html',
        })
      }} />;
    }

    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Unsupported Notion block type: ${type === 'unsupported' ? 'unsupported by Notion API' : type}`);
      }
      return null;
  }
}

// For nested lists
export function renderNestedList(blocks: { [x: string]: any; type?: any; }) {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol className='items-center justify-center' key={value.id}>{value.children.map((block: any) => renderBlock(block))}</ol>;
  }
  return <ul className='items-center justify-center' key={value.id}>{value.children.map((block: any) => renderBlock(block))}</ul>;
}