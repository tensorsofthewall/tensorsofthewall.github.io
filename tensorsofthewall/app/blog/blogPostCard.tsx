import Image from "next/image";
import React from "react";
import { Card } from "antd";
import Link from "next/link";
import { FaCalendarDay } from "react-icons/fa6";
import { RxTimer } from "react-icons/rx";
// import { RxUpdate } from "react-icons/rx";
// import { differenceInDays } from "date-fns";

interface BlogPostCardProps {
    title: string;
    description: string;
    imageURL: string;
    slug: string;
    tags: string[];
    publishDate: string;
    lastEditDate: string;
    readTime: string;
}

const BlogPostCard = (( data: BlogPostCardProps) => {
    const { title, description, imageURL, slug, publishDate, readTime } = data; // tags, lastEditDate

    return (
        <Link href={{ pathname: `/blog/${slug}`}}>
            <Card
                hoverable
                className="w-[380px] max-w-[400px] sm:max-w-[400px] md:max-w-md lg:max-w-lg xl:max-w-xl 
               h-auto min-h-[300px] md:min-h-[300px] lg:min-h-[350px] text-center items-center justify-center hover:scale-105 relative "
                title={
                        <div className="flex justify-center items-center w-full rounded-t-lg">
                        <Image 
                            src={imageURL}
                            alt={title}
                            width={300}
                            height={250}
                            style={{
                                objectFit: "scale-down", 
                                backgroundColor: "#0a0a0a",
                                margin: '0'
                            }}
                        />
                        </div>
                    }
                style={{
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    backgroundColor: '#1a1c1b',
                }}
            >
            <div className="mt-4 px4" style={{
                color: '#f0f0f0'
            }}>
                <div className="flex justify-between items-stretch w-full gap-x-8">
                    {/* Left side: title and description */}
                    <div className="flex flex-col text-left justify-center flex-1">
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-lg md:text-xl lg:text-2xl font-bold mr-8">{title}</h4>
                            <div className="flex items-center gap-2 ml-4">
                                <FaCalendarDay className="h-4 w-4 md:w-{4.5} md:h-{4.5} lg:w-5 lg:h-5"/>
                                <span className="text-md md:text-lg lg:text-xl font">{publishDate}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="text-sm md:text-md lg:text-lg font mt-1">{description}</p>
                            {/* {differenceInDays(new Date(lastEditDate), new Date(publishDate)) > 1 ? <div className="flex items-center gap-2 ml-4">
                                <RxUpdate className="h-4 w-4 md:w-{4.5} md:h-{4.5} lg:w-5 lg:h-5"/>
                                <span className="text-sm md:text-sm lg:text-md font">Updated: {lastEditDate}</span>
                            </div> : <></>} */}
                            { readTime !== "0" ? <div className="flex items-center gap-2 ml-4">
                                <RxTimer className="h-4 w-4 md:w-{4.5} md:h-{4.5} lg:w-5 lg:h-5"/>
                                <span className="text-sm md:text-md lg:text-lg font ">{readTime} min read</span></div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </Link>
    );
})

export default BlogPostCard;