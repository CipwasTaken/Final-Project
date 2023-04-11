import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import CommentSection from "./CommentSection";


function BlogPostPage() {
    const { id } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/blogpost/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBlogPost(data.message);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }, [id]);

return (
    <Main>
        {isLoading ? (
        <LoadingSpinner />
        ) : (
        blogPost && (
        <>
            <BlogDiv>
                <PostContent>{blogPost.content}</PostContent>
                <Posttime>{blogPost.date}</Posttime>
            </BlogDiv>
            <CommentDiv>
                <CommentSection postId={id} />
            </CommentDiv>
        </>
        ))}
    </Main>
    );
}

export default BlogPostPage;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const BlogDiv = styled.div`
    color: white;
    background-color: #d0b8a8;
    width: 60em;
    padding: 2em;
    border-bottom: 2px solid #7D6E83;
`;

const PostContent = styled.p`
    font-size: 18px;
    color: black;
`;

const Posttime = styled.p`
    font-size: 12px;
    color: black;
`;

const CommentDiv = styled.div`
width: 62em;
display: flex;
justify-content: center;
background-color: #DFD3C3;
padding: 1em;
`