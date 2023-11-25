/* eslint-disable react-hooks/rules-of-hooks */
import { SendBirdProvider } from "@sendbird/uikit-react";
import ChatApp from "./components/ChatApp";
import "@sendbird/uikit-react/dist/index.css";
import { useCreateUser } from "./hooks/useCreateUser";

const APP_ID = import.meta.env.VITE_APP_ID;

function App() {
  const environment = import.meta.env.MODE
  const { userData, loading } =
    environment === "production"
      ? useCreateUser()
      : { userData: {}, loading: false };

  const { nickname, profileUrl, userId } = userData;


  console.log(environment)
  const defaultUserId = import.meta.env.VITE_USER_ID
  const defaultNickname = import.meta.env.VITE_DEFAULT_NICKNAME
  const defaultProfile = import.meta.env.VITE_DEFAULT_PROFILE
  const userIdentifier = environment === "development" ? defaultUserId : userId
  const userNickname = environment === "development" ? defaultNickname : nickname
  const userProfileUrl = environment === "development" ? defaultProfile : profileUrl

  return (
    <div className="App">
      {loading && console.log('Loading...')}
      <SendBirdProvider
        appId={APP_ID}
        userId={userIdentifier}
        nickname={userNickname}
        profileUrl={userProfileUrl}
      >
        <ChatApp />
      </SendBirdProvider>
    </div>
  );
}

export default App;
