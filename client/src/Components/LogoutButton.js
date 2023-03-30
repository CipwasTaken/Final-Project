import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

function LogoutButton () {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated &&(
        <Button onClick={() => logout()}>
            Sign Out
        </Button>
        )
    )
}

export default LogoutButton

const Button = styled.button`
background-color: #D0B8A8;
border: none;
padding: 1em;
border-radius: 5em;
`