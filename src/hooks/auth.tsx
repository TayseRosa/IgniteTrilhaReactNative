import React, { 
  createContext, 
  ReactNode, 
  useContext
} from "react";

/* const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env; */

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps{
  children: ReactNode;
}

interface User{
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider ({ children } : AuthProviderProps){
  const user = {
    id: '21313899',
    name: 'Tayse Rosa',
    email:'developer@tayserosa.dev'
  };

  //Centralizar a autenticação aqui e compartihar em outro local da aplicação
  async function signInWithGoogle(){
    try {
      const CLIENT_ID = '1034865090835-mgtqmf1esl2diokmk9j2i193f98mopmq.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@tayse_rosa/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response =  await AuthSession.startAsync({ authUrl });
      console.log(response);     

    }catch(error){
      //Tratar o erro no local que chamou a função
      throw new Error(error as string);
    }
  }

  return(
    <AuthContext.Provider value={{ 
      user, 
      signInWithGoogle 
    }}>
      { children }
    </AuthContext.Provider>   
  )
}

//Vamos transformar nosso contexto em nosso Hook
function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }