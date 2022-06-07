
import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Components/FirebaseAuth/Firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';
initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email:'',
    photo: ''
  });
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      const {displayName, email, photoURL} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(displayName, email, photoURL);
    }).catch((error) => {
      console.log(error);
      console.log(error.message);
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
  // Sign-out successful.
const signedOutUser = {
  isSignedIn: false,
  name: '',
  photo: '',
  email: ''

}
setUser(signedOutUser)
    }).catch((error) => {
  // An error happened.
  console.log(error);
    });
  }
  return (
    <>
    {
      user.isSignedIn ? <button onClick={handleSignOut}> Sign Out</button> :
      <button onClick={handleSignIn}> Sign in</button>
    }
    {
      user.isSignedIn && <div>
        <p> Welcome, {user.name}</p>
        <p> Your Email :  {user.name}</p>
        
      </div>
    }
    </>
  );
}

export default App;
