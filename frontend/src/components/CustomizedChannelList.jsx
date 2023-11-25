/* eslint-disable react/prop-types */
import ChannelListHeader from "@sendbird/uikit-react/ChannelList/components/ChannelListHeader";
import ChannelPreview from "@sendbird/uikit-react/ChannelList/components/ChannelPreview";
import EditProfile from "./EditProfile";
import { useState, useEffect } from "react";
import CustomCreateChannel from "./CustomCreateChannel";
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";

const CustomizedChannelList = ({activeChannel, handleCurrentChannel}) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [channels, setChannels] = useState(null)
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const channelListState = useChannelListContext();

  useEffect(() => {
    const getChannels = async () => {
      const allChannels = await channelListState.allChannels;
      setChannels(allChannels);
    };
    getChannels();
  }, [channelListState.allChannels]);

  const renderEditProfile = () => {
    setShowEditProfile(true);
  };
  const closeEditProfile = () => {
    setShowEditProfile(false);
  };

  const renderCreateChannel = () => {
    setShowCreateChannel(true)
  }
  const closeCreateChannel = () => {
    setShowCreateChannel(false)
  }
  if(!channels){
    return null
  }


  return (
    <div className="channel-list-wrapper">
      <div className="channel-list-header">
        <ChannelListHeader
          onEdit={renderEditProfile}
          renderIconButton={() => (
            <button className="render-btn" onClick={renderCreateChannel}>
              +
            </button>
          )}
        />
        {showEditProfile && <EditProfile onClose={closeEditProfile} />}
        {showCreateChannel && (
          <CustomCreateChannel onClose={closeCreateChannel} />
        )}
      </div>
      <div className="channel-list-preview">
        {channels.map((channel) => (
          <div key={channel._url}>
            <ChannelPreview
              channel={channel}
              renderChannelAction={() => null}
              onClick={() => handleCurrentChannel(channel)}
              isActive={
                activeChannel ? activeChannel.url === channel.url : false
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizedChannelList;
