import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";

function AdminPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newPost, setNewPost] = useState("");
    const [refetch, setRefetch] = useState(true)
    const { isAuthenticated } = useAuth0();
  
    const fetchBlogPosts = () => {
      fetch("/api/blogpost/")
        .then((res) => res.json())
        .then((data) => {
          setBlogPosts(data);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };

    const handlePost = async (e) => {
        e.preventDefault();
        if (newPost) {
          const response = await fetch(`/api/blogpost/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: newPost }),
          });
          const data = await response.json();
          
          setNewPost("");
          setRefetch(!refetch)
        }
      };
  
    useEffect(() => {
      fetchBlogPosts();
    }, [refetch]);
  
    const handleDeletePost = (postId) => {
      fetch(`/api/blogpost/${postId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setBlogPosts(blogPosts.filter((post) => post._id !== postId));
          } else {
            throw new Error("Failed to delete post.");
          }
        })
        .catch((error) => console.error(error));
    };
  
    const handleEditPost = (postId, content) => {
      const updatedPost = {
        content: content,
      };
      fetch(`/api/blogpost/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      })
        .then((res) => {
          if (res.ok) {
            setBlogPosts(
              blogPosts.map((post) => {
                if (post._id === postId) {
                  return {
                    ...post,
                    content: content,
                  };
                }
                return post;
              })
            );
          } else {
            throw new Error("Failed to update post.");
          }
        })
        .catch((error) => console.error(error));
    };
  
    return (
      <>
        <Main>
          {isLoading ? (
            <LoadingDiv>
              <LoadingSpinner />
            </LoadingDiv>
          ) : (
            <ContentDiv>
                {isAuthenticated && (
          <NewPostDiv>
            <Form onSubmit={handlePost}>
              <Text
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button type="submit">Post</Button>
            </Form>
          </NewPostDiv>
        )}
              {blogPosts.map((post) => (
                <Nav to={`/blog/${post._id}`} key={post.id}>
                    <BlogDiv key={post._id}>
                  <PostContent>{post.content}</PostContent>
                  <Posttime>{post.date}</Posttime>
                  <ButtonDiv>
                    <Button
                      onClick={() => {
                        const newContent = prompt(
                          "Enter new content:",
                          post.content
                        );
                        if (newContent !== null && newContent !== post.content) {
                          handleEditPost(post._id, newContent);
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDeletePost(post._id)}>
                      Delete
                    </Button>
                  </ButtonDiv>
                </BlogDiv>
                </Nav>
              ))}
                </ContentDiv>
            
          )}
        </Main>
      </>
    );
  }

export default AdminPage;

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

const ButtonDiv = styled.div`
display: flex;
flex-direction: row;
gap: 0.5em;
margin-top: 0.5em;
justify-content: center;
`
const Button = styled.button`
border: none;
padding: 1em;
border-radius: 5em;
background-color: #7D6E83;
color: white;
font-size: 15px;
justify-content: center;
`

const NewPostDiv = styled.div`
display: flex;
flex-direction: column;
width: 62%;
margin-bottom: 1em;
background-color: #d0b8a8;
padding: 1em
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1em;
`

const Text = styled.textarea`
width: 40em;
height: 10em;
`
