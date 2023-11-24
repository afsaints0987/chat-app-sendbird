/* eslint-disable react/prop-types */
import { CreateChannelProvider } from "@sendbird/uikit-react/CreateChannel/context";
import CreateChannelUI from "@sendbird/uikit-react/CreateChannel/components/CreateChannelUI";

const CustomCreateChannel = ({onClose}) => {

  return <div>
    <CreateChannelProvider >
        <CreateChannelUI onCancel={onClose} />
        </CreateChannelProvider>
  </div>;
};

export default CustomCreateChannel;
