/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react';
import Link from 'next/link';

import Text from './text';
import styles from '../../styles/post.module.css';
import Image from 'next/image';

export function renderBlock(block: any) {
  const { type, id } = block;
  const value = block[type];
  if ('rich_text' in value && value.rich_text.length === 0) {
    return (
      <div>
        <br />
      </div>
    );
  }

  switch (type) {
    case 'paragraph':
      return (
        // <p className="leading-[28px] text-lg" style={{ margin: '0.3% 0' }}>
        <p className="leading-[28px] text-sm sm:text-md md:text-lg lg:text-xl" style={{ margin: '0.3% 0' }}>
          <Text title={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        // <h1 className="text-3xl font-bold" style={{ margin: '1.2% 0' }}>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ margin: '1.2% 0' }}>
          <Text title={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        // <h2 className="text-2xl font-bold" style={{ margin: '0.8% 0' }}>
        <h2 className="font-bold text-md sm:text-lg md:text-xl lg:text-2xl" style={{ margin: '0.8% 0' }}>
          <Text title={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        // <h3 className="text-xl font-bold" style={{ margin: '0.5% 0' }}>
        <h3 className="font-bold text-sm sm:text-md md:text-lg lg:text-xl" style={{ margin: '0.5% 0' }}>
          <Text title={value.rich_text} />
        </h3>
      );
    case 'bulleted_list': {
      return <ul className='items-center justify-center list-disc list-inside' key={block.id}>{value.children.map((child: any) => renderBlock(child))}</ul>;
    }
    case 'numbered_list': {
      return <ol className='items-center justify-center list-decimal list-inside' key={block.id}>{value.children.map((child: any) => renderBlock(child))}</ol>;
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={block.id} className='items-center justify-center'>
          <Text title={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div className='items-center justify-center'>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />
            {' '}
            <Text title={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text title={value.rich_text} />
          </summary>
          <div className="ml-4">
            {Array.isArray(block.children) &&
              block.children.map((child: any) => (
                <Fragment key={child.id}>{renderBlock(child)}</Fragment>
              ))}
          </div>
        </details>
      );
    case 'child_page':
      return (
        <div className={styles.childPage} key={block.id} style={{ margin: '2% 0' }}>
          <strong>{value?.title}</strong>
          {block.children.map((child: any) => renderBlock(child))}
        </div>
      );
    case 'image': {
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure style={{ margin: '1% 0' }}>
          <Image
            src={src}
            alt={caption}
            width={640}
            height={480}
            style={{ marginBottom: '1%' }}
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case 'divider':
      return <hr className="h-px my-1 bg-gray-700 border-0" key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
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
        <figure style={{ margin: '0.4% 0' }}>
          <div className={styles.file}>
            📎
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
        <a href={href} target="_blank" rel="noreferrer noopener" className={styles.bookmark}>
          {href}
        </a>
      );
    }
    case 'table': {
      return (
        <table className={styles.table} style={{ margin: '1% 0'}} key={block.id}>
          <tbody>
            {block.children?.map((child: any, index: number) => {
              const RowElement = value.has_column_header && index === 0 ? 'th' : 'td';
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: { plain_text: any; }, i: any) => (
                    <RowElement key={`${cell.plain_text}-${i}`}>
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
        <div className={styles.row} key={block.id} style={{ margin: '2% 0'}}>
          {block.children.map((childBlock: any) => renderBlock(childBlock))}
        </div>
      );
    }
    case 'column': {
      return <div key={block.id}>{block.children.map((child: any) => renderBlock(child))}</div>;
    }
    case 'callout':{
      return (
        <div className="flex bg-[#1f1d1e]" style={{ margin: '0.5% 0', borderRadius: '4px', padding: '2px' }} key={block.id}>
          {value.icon && value.icon.emoji ? (
        <span
          style={{
            marginRight: '0.5%',
            fontFamily: `'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji','Android Emoji',sans-serif`,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '1em',
            lineHeight: 1,
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        >
          {value.icon.emoji}
        </span>
        ) : null}
          <Text title={value.rich_text} />
        </div>
      )
    }

    default:
      return `❌ Unsupported block (${
        console.log(`Unsupported block type: ${type}`),
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
}

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