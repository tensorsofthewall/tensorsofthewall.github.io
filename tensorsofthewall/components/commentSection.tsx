"use client";
import Giscus from "@giscus/react";

const CommentSection = () => (
    <Giscus 
            id="comments"
            repo="tensorsofthewall/tensorsofthewall.github.io"
            repoId="R_kgDOMy5vMQ"
            category="Giscus for Blog Posts"
            categoryId="DIC_kwDOMy5vMc4CsLhi"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="preferred_color_scheme"
            lang="en"
            loading="lazy"
        />
);

export default CommentSection;
