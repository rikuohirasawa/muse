import { useAuth0 } from "@auth0/auth0-react";

export const SignInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Sign In</button>;
};