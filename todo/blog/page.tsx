import { getDatabase } from '../lib/notionhq';
import React from 'react';
import { isFullPageOrDatabase } from '@notionhq/client';
import Text from '@/components/notionhq/text';
import Link from 'next/link';

const pageStartText = ["Overengineered Oversharing", "Because why keep it simple?"]

async function getPosts() {
    const database = await getDatabase();
    return database;
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '75px'}} className="font-['arial']">
            <strong style={{ width: '450px'}}>
                {pageStartText.map((text, index) => (
                    <React.Fragment key={index}>
                        <span style={{ fontSize: `${24-index*6}px`}}>
                        {text}{index ===0 && <br/>}
                        </span>
                    </React.Fragment>
                ))}
                <br/><br/>
            </strong>
            <div className="flex flex-col" style={{ width: '600px', margin: 'auto'}}>
                <h2 className="font-bold text-[1.8rem] mb-10 mt-10 border-b-[0.25px] border-solid border-white-100">All Posts</h2>
            </div>
            <ol className='list-none margin-0 padding-0'>
                {posts.map((post) => {
                    if (!isFullPageOrDatabase(post)) return null;

                    let publishDate = '';
                    if (post.properties.PublishDate.type === 'date') {
                        publishDate = new Date(post.properties.PublishDate.date!.start).toLocaleDateString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                            }
                        );
                    }

                    const blogURL = `/blog/post/${Object.values((post.properties.UID as any).unique_id).join('-')}`
                    return (
                         <li key={post.id} className='mb-[50px]'>
                            <h3 className='text-[1.5rem]'>
                                {post.properties.Title.type === 'title' && 
                                <>
                                <a href={`${blogURL}`}>
                                    <Text title={post.properties.Title.title} />
                                </a>

                                <p className='opacity-65 mt-2 mb-2 text-[1.3rem]'>{publishDate}</p>

                                <Link href={`${blogURL}`} style={{
                                    color: '#349fc1',
                                    fontSize: '1.2rem',
                                }}>
                                    Read Post →
                                </Link>
                                </>
                                }
                            </h3>
                        </li>
                    )
})}
            </ol>
        </div>
    )
}