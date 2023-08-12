import { useEffect, useState } from 'react';
import { getDatabase,push,ref,set,onChildAdded, update } from "firebase/database";
import { GoogleAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import './App.css';

// Add log-out button // Add styling

function App(){
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleLogin = ()=>{
   
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setUser({name: result.user.displayName ,email: result.user.email});
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    })
  }

  const [user,setUser] = useState('');
  const [chats,setchats] = useState([]); 
  const [msg,setMsg] = useState('')
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  

  const updateHeight=()=>{
    const el = document.getElementById('chat');
    if (el){
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect( ()=>{
    
    onChildAdded(chatListRef, (data) => {
      setchats(chats=>[...chats,data.val()]);
      setTimeout( ()=>{
        updateHeight();
      },100)
      
    });
  },[])



 const sendChat = ()=>{

 
 const chatRef = push(chatListRef);
 set(chatRef, {
       user , message : msg 
 });

  // const c = [...chats];
  // c.push({name,message:msg});
  // setchats(c);

  setMsg('')
 };
  return (
    <div>
      {user.email? null: <div> 
        {/* <input type='text' placeholder='Enter your user' 
      onBlur={e=>setUser(e.target.value)}>
        </input> */}
        <button onClick={e=>{googleLogin()}}>Google Sign in</button>
        </div>
      }
      {user.email?<div>
       <h1>User: {user.name}</h1>
       <div id = "chat"class = "chat-container">
        {chats.map( c=>
        <div class ={`container ${c.user.email === user.email  ? 'me': '' }`}>
        < p class = "chatbox">
          <strong>{c.user.name} :  </strong>
          <span>{c.message}</span>
        </p>
        </div>)}
       
       </div>
       </div> :null}
       <div class="btn">
        <input type="text" onInput={e=>setMsg(e.target.value)} value={msg} placeholder="Enter text"></input>
        <button onClick={e=>sendChat()}>Send</button>
       </div>
    </div>
  );
}

export default App;
