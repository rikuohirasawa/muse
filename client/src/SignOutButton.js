import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./SignInButton";

export const SignOutButton = () => {
  const { logout } = useAuth0();

  return (
    <LoginButton 
    onClick={() => logout({ returnTo: 'http://localhost:3000/home'})}>
      Sign Out
    </LoginButton>
  );
};

