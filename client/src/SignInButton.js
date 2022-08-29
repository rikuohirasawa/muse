import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

export const SignInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <LoginButton 
    onClick={() => loginWithRedirect()}>Sign In</LoginButton>
  )
};


export const LoginButton = styled.button`
  font-family: inherit;
  color: inherit;
  background: inherit;
  font-size: inherit;
  transition: all .1s ease-in-out;
  cursor: pointer;
  border: none;
  
  &:hover,
  &:focus {
      transform: scale(1.1)
  };
`