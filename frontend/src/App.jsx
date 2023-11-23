import {SendBirdProvider} from "@sendbird/uikit-react"
import ChatApp from "./components/ChatApp"
import "@sendbird/uikit-react/dist/index.css";
// import { useCreateUser } from "./hooks/useCreateUser";
// import { useEffect, useCallback } from "react";

const APP_ID = import.meta.env.VITE_APP_ID
const USER_ID = "730cf02b-989a-52ad-9639-a31e8506bfbb";

function App() {
  // const { userId, nickname, profileUrl, storeUser } = useCreateUser();

  // const persistStoreUser = useCallback(() => {
  //   storeUser()
  // },[])

  // useEffect(() => {
  //   persistStoreUser()
  // },[])

  return (
    <div className="App">
      <SendBirdProvider appId={APP_ID} userId={USER_ID} >
        <ChatApp />
      </SendBirdProvider>
    </div>
  );
}

export default App;
