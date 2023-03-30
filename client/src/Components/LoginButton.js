import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

function LoginButton () {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated &&(
        <Button onClick={() => loginWithRedirect()}>
            Sign In
        </Button>
        )
    )
}

export default LoginButton

const Button = styled.button`
background-color: #D0B8A8;
border: none;
padding: 1em;
border-radius: 5em;
`