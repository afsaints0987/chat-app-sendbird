import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";


const appId = import.meta.env.VITE_APP_ID
const userId = "730cf02b-989a-52ad-9639-a31e8506bfbb";


function App() {
  return (
    <div className="App">
      <SendbirdApp appId={appId} userId={userId} allowProfileEdit={true}/>
    </div>
  );
}

export default App;
