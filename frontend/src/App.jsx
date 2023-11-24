import { SendBirdProvider } from "@sendbird/uikit-react";
import ChatApp from "./components/ChatApp";
import "@sendbird/uikit-react/dist/index.css";
// import { useCreateUser } from "./hooks/useCreateUser";


const APP_ID = import.meta.env.VITE_APP_ID;
const USER_ID = "730cf02b-989a-52ad-9639-a31e8506bfbb";

function App() {
  // const { userData, loading } = useCreateUser();
  
  // const { nickname, profileUrl, userId } = userData
  // console.log(nickname, profileUrl, userId)

  return (
    <div className="App">
      {/* {loading && console.log('Loading...')} */}
      <SendBirdProvider
        appId={APP_ID}
        userId={USER_ID}
        // nickname={nickname}
        // profileUrl={profileUrl}
      >
        <ChatApp />
      </SendBirdProvider>
    </div>
  );
}

export default App;
