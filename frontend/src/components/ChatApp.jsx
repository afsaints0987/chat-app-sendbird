import { Channel, ChannelSettings } from "@sendbird/uikit-react";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import { useState } from "react";
import CustomizedChannelList from "./CustomizedChannelList";

const ChatApp = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null)
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  const [showSettings, setShowSettings] = useState(false);
  let channelChatDiv = document.getElementsByClassName("channel-chat")[0];

  const renderSettingsBar = () => {
    channelChatDiv.style.width = "52%";
    channelChatDiv.style.cssFloat = "left";
  };

  const hideSettingsBar = () => {
    channelChatDiv.style.width = "76%";
    channelChatDiv.style.cssFloat = "right";
  };

  const handleActiveChannel = (channel) => {
    setActiveChannel(channel)
  }

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <ChannelListProvider
          onChannelSelect={(channel) => setCurrentChannel(channel)}
        >
          <CustomizedChannelList activeChannel={activeChannel} handleChannelClick={handleActiveChannel}/>
        </ChannelListProvider>
      </div>
      <div className="channel-chat">
        <Channel
          channelUrl={currentChannelUrl}
          onChatHeaderActionClick={() => {
            setShowSettings(!showSettings);
            renderSettingsBar();
          }}
        />
      </div>
      {showSettings && (
        <div className="channel-settings">
          <ChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
              hideSettingsBar();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatApp;
