import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";

function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetch("/api/blogpost")
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Main>
        {isLoading ? (
          <LoadingDiv>
            <LoadingSpinner />
          </LoadingDiv>
        ) : (
          <ContentDiv>
            {blogPosts.map((post, index) => (
              <BlogDiv
                key={post.id}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <PostContent>{post.content}</PostContent>
                <Posttime>{post.date}</Posttime>
              </BlogDiv>
            ))}
          </ContentDiv>
        )}
      </Main>
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
`;

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

const PostContent = styled.p`
  font-size: 18px;
  color: black;
`;

const Posttime = styled.p`
  font-size: 12px;
  color: black;
`;