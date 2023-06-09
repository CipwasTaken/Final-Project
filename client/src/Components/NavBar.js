import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./LoadingSpinner";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const NavigationBar = () => {
  const { isLoading, error } = useAuth0();
  const { isAdmin } = useContext(UserContext);
  return (
    <Container>
      <Wrapper>
        <Img src="/Name.png" alt="site name" />
        <Nav to="/">
          <div>
            <Text>Home</Text>
          </div>
        </Nav>
        <Nav to="/blog">
          <div>
            <Text>Blog</Text>
          </div>
        </Nav>
        <Nav>
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <LoadingSpinner />}
          {!error && !isLoading && (
            <>
            <Div>
            {isAdmin && (
                <Nav to="/admin">
                  <div>
                    <Text>Admin</Text>
                  </div>
                </Nav>
              )}
              <LoginButton />
              <LogoutButton />
            </Div>
          </>
          )}
          
        </Nav>
      </Wrapper>
    </Container>
  );
};


export default NavigationBar;

const Img = styled.img`
width: 17em;
height: auto;
`

const Nav = styled(NavLink)`
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: #7D6E83;
  height: 10vh;
`;

const Text = styled.p`
  color: white;
`;

const Div = styled.div`
display: flex;
gap: 2em;
`