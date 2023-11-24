/* eslint-disable react/prop-types */
import { CreateChannelProvider } from "@sendbird/uikit-react/CreateChannel/context";
import CreateChannelUI from "@sendbird/uikit-react/CreateChannel/components/CreateChannelUI";
import { useSendbirdStateContext } from "@sendbird/uikit-react/SendbirdProvider";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import { http } from "../config/axios";

const CustomCreateChannel = ({ onClose }) => {
  const store = useSendbirdStateContext();
  const getChannel = sendbirdSelectors.getGetGroupChannel(store);

  const getCreatedChannel = async (channelUrl) => {
    const newChannel = await getChannel(channelUrl);
    console.log("New Channel:", newChannel);

    const { url, creator, members } = newChannel;
    const newChannelUrl = url;
    const newChannelCreator = creator.userId;
    const chatmateId = members[1].userId;

    try {
      const response = await http.post("/create-channel", {
        channel_url: newChannelUrl,
        chatmate_identifier: chatmateId,
        created_by_identifier: newChannelCreator,
      });
      console.log("Channel Created Successfully", response.data);
      alert("Channel Created Successful!");
    } catch (err) {
      console.log("Create Channel Failed", err);
    }
  };

  return (
    <div>
      <CreateChannelProvider
        onCreateChannel={(channel) => getCreatedChannel(channel.url)}
      >
        <CreateChannelUI onCancel={onClose} />
      </CreateChannelProvider>
    </div>
  );
};

export default CustomCreateChannel;
