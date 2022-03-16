import {
  //signInWithGoogleRedirect,
  //auth,
} from '../../utils/firebase/firebase.utils';
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss';

const SignIn = () => {

  // useEffect(async () => {
  //   const { user } = await getRedirectResult(auth)
  //   if (user) {
  //     await createUserDocumentFromAuth(user);
  //   }
  // }, []);

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
      {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
    </div>
  );
};

export default SignIn;

//commented cod in case using Sign in with Google Redirect,
// when we are redirecting on other page and will return to our app after authentication
