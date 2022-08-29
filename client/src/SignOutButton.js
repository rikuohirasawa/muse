import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./SignInButton";

export const SignOutButton = () => {
  const { logout } = useAuth0();

  return (
    <LoginButton 
    onClick={() => logout({ returnTo: window.location.origin })}>
      Sign Out
    </LoginButton>
  );
};

