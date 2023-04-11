import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";


function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const {setIsAdmin} = useContext(UserContext)


  const fetchUserInfo = () => {
    fetch(`/api/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsAdmin(data.message)
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log(user)
    if (user) {
      fetch("/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
          fetchUserInfo();
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()}>Sign In</Button>
    )
  );
}

export default LoginButton;

const Button = styled.button`
  background-color: #d0b8a8;
  border: none;
  padding: 1em;
  border-radius: 5em;
`;