
import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Components/FirebaseAuth/Firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';
import Chatbot from './Components/Chatbot/Chatbot';
initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email:'',
    photo: '',
    password: ''
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
  const handleSubmit = () => {
     console.log('clicked');
   }
   const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
        isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password') {
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (e.target.name === 'name') {
        const isName = e.target.value;
        isFormValid = isName;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
  }

   }
  return (
    <div className="App">
    {
      user.isSignedIn ? <button type="button" className="btn btn-primary" onClick={handleSignOut}> Sign Out</button> :
      <button type="button" className="btn btn-primary" onClick={handleSignIn}> Sign in</button>
    }
    {
      user.isSignedIn && <div>
        <p> Welcome, {user.name}</p>
        <p> Your Email :  {user.email}</p>
        
      </div>
    }
    <h1>Our Own Authentication</h1>
    <form onSubmit={handleSubmit}>
      <input type='text' name='email' onBlur={handleBlur} placeholder='Your Email Address' required />
      <br/>
      <input type='password' name='password' onBlur={handleBlur} placeholder="Your Password" required />
      <br/>
      <input type="submit" value="Submit"/>
    </form>
    <Chatbot />
    </div>
  );
}

export default App;
