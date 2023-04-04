import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comment/${postId}`);
      const data = await response.json();
      setComments(data);
      setIsLoading(false)
    };
    fetchComments();
  }, [postId, refetch]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (newComment) {
      const response = await fetch(`/api/comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment, user: user.name  }),
      });
      const data = await response.json();
      
      setNewComment("");
      setRefetch(!refetch)
    }
  };

  return (
    <Main>
        <Container>
          {isAuthenticated && (
            <NewCommentDiv>
              <h2>Comments</h2>
              <Form onSubmit={handlePostComment}>
                <Text
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button type="submit">Post Comment</Button>
              </Form>
            </NewCommentDiv>
        )}
        {isLoading ? (
        <LoadingSpinner />
        ) : (
            <ListDiv>
              <ul>
                  {comments.map((comment) => (
                  <List key={comment._id}>
                    <CommentDiv>
                      <NameDate>
                        <h3>{comment.name}</h3>
                        <p> - {comment.date}</p>
                      </NameDate>
                      <div>{comment.content}</div>
                    </CommentDiv>
                  </List>
                  ))}
              </ul>
            </ListDiv>
          )}
        </Container>
    </Main>
  );
};

export default CommentSection;

const Main = styled.div`
display: flex;
flex-direction: column;

`

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1em;
`

const NewCommentDiv = styled.div`
display: flex;
flex-direction: column;
width: 100%;

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

const Button = styled.button`
border: none;
padding: 1em;
border-radius: 5em;
background-color: #7D6E83;
color: white;
font-size: 15px;
justify-content: center;
`

const ListDiv = styled.div`
`

const List = styled.li`
display: flex;
gap: 1em;
`

const CommentDiv = styled.div`
margin-bottom: 1em;
border-bottom: 2px solid #7D6E83;
width: 40em;
justify-content: center;
`

const NameDate = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: .5em;
`