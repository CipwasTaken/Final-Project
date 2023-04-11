import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";


function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogPosts = () => {
    fetch("/api/blogpost/")
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchBlogPosts();
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
              <Nav to={`/blog/${post._id}`} key={post.id}>
                <BlogDiv
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                >
                  <PostContent>{post.content}</PostContent>
                  <Posttime>{post.date}</Posttime>
                </BlogDiv>
              </Nav>
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

const Nav = styled(NavLink)`
text-decoration: none;
width: 100%;
display: flex;
justify-content: center;
`
const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
margin-top: 1em;
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
