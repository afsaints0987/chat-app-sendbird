import {useCallback, useEffect, useState} from 'react'
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";


const appId = import.meta.env.VITE_APP_ID
const userId = "730cf02b-989a-52ad-9639-a31e8506bfbb";
const userUrl = import.meta.env.VITE_USER_URL

function App() {
  const [user, setUser] = useState([])
  
  const createUser = useCallback( async () => {
    try {
      const response = await fetch(userUrl);
      const userData = await response.json();
      const userProfile = await userData.results[0];
      setUser(userProfile);
    } catch (err) {
      console.log(err)
    }
  },[])

  useEffect(() => {
    createUser()

    return () => {
      setUser([])
    }
  },[])

  const userLogin = user.login
  if(!userLogin){
    return null
  } 
  // const {uuid} = userLogin
  // const userId = uuid

  return (
    <div className="App">
      <SendbirdApp appId={appId} userId={userId} allowProfileEdit={true}/>
    </div>
  );
}

export default App;
