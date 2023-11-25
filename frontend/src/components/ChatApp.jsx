import { Channel, ChannelSettings } from "@sendbird/uikit-react";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import { useState } from "react";
import CustomizedChannelList from "./CustomizedChannelList";

const ChatApp = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [activeChannel, setActiveChannel] = useState(false)
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  const [showSettings, setShowSettings] = useState(false);
  
  const renderSettingsBar = () => {
    setShowSettings(true);
  };

  const hideSettingsBar = () => {
    setShowSettings(false);
  };


  const handleCurrentChannel = (channel) => {
    setCurrentChannel(channel)
    setActiveChannel(true)
  }

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <ChannelListProvider>
          <CustomizedChannelList
            handleCurrentChannel={handleCurrentChannel}
            activeChannel={activeChannel}
          />
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
        <div
          className={`channel-chat ${
            showSettings ? "channel-chat-settings" : "channel-chat-default"
          }`}
        >
          <ChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              hideSettingsBar()
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatApp;
