import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import LoadingSpinner from "./LoadingSpinner";


function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blogpost")
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data)
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Main>
        {isLoading ? (
            <LoadingDiv><LoadingSpinner /></LoadingDiv>
        ) : (
        <ContentDiv>
          {blogPosts.map((post) => (
            <BlogDiv key={post.id}>
              <PostContent>{post.content}</PostContent>
              <Posttime>{post.date}</Posttime>
            </BlogDiv>
          ))}
        </ContentDiv>
        )}
      </Main>
      <GlobalStyle />
    </>
  );
}

export default BlogPage;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;


const LoadingDiv = styled.div`
display: flex;
justify-content: center;
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogDiv = styled.div`
  color: white;
  background-color: #d0b8a8;
  width: 60%;
  padding: 2em;
  margin-bottom: 1em;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 1em;
`;

const PostContent = styled.p`
  font-size: 18px;
  color: black;
`;

const Posttime = styled.p`
  font-size: 12px;
  color: black;
`;

const NavDiv = styled.div``;