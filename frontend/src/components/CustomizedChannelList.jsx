/* eslint-disable react/prop-types */
import ChannelListHeader from "@sendbird/uikit-react/ChannelList/components/ChannelListHeader";
import ChannelPreview from '@sendbird/uikit-react/ChannelList/components/ChannelPreview';
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import EditProfile from "./EditProfile";
import { useState, useEffect } from "react";
import CustomCreateChannel from "./CustomCreateChannel";



const CustomizedChannelList = ({activeChannel, handleChannelClick}) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [channels, setChannels] = useState([]);
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const channelListState = useChannelListContext();

  useEffect(() => {
    const getChannels = async () => {
      const allChannels = await channelListState.allChannels;
      setChannels(allChannels);
    };
    getChannels();

    return () => {
      setChannels([]);
    };
  }, [channelListState.allChannels]);

  const renderEditProfile = () => {
    setShowEditProfile(!showEditProfile);
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

  console.log(channels)

  return (
    <div className="channel-list-wrapper">
      <div className="channel-list-header">
        <ChannelListHeader onEdit={renderEditProfile} renderIconButton={() => (<button className="render-btn" onClick={renderCreateChannel}>+</button>)}/>
        {showEditProfile && <EditProfile onClose={closeEditProfile} />}
        {showCreateChannel && <CustomCreateChannel onClose={closeCreateChannel}/>}
      </div>
      <div className="channel-list-preview">
        {channels.map(channel => (
          <div key={channel._url}>
            <ChannelPreview channel={channel} renderChannelAction={() => null} onClick={handleChannelClick} isActive={channel === activeChannel}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizedChannelList;
