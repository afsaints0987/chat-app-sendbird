/* eslint-disable react/prop-types */
import ChannelListHeader from "@sendbird/uikit-react/ChannelList/components/ChannelListHeader";
import ChannelPreview from '@sendbird/uikit-react/ChannelList/components/ChannelPreview';
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import EditProfile from "./EditProfile";
import { useState, useEffect } from "react";

const CustomizedChannelList = ({activeChannel, handleChannelClick}) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [channels, setChannels] = useState([]);
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

  return (
    <div className="channel-list-wrapper">
      <div className="channel-list-header">
        <ChannelListHeader onEdit={renderEditProfile} />
        {showEditProfile && <EditProfile onClose={closeEditProfile} />}
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
