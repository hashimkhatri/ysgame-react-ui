import { useGoogleLogin } from '@react-oauth/google';

export const useGoogleSignIn = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    onError: errorResponse => console.error(errorResponse),
    clientId: "372029074880-ibs30n1molnl6u4ir06f88k055p80t23.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  return login;
};
