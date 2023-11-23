/* eslint-disable react/prop-types */
import { useSendbirdStateContext } from "@sendbird/uikit-react/SendbirdProvider";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import EditUserProfile from "@sendbird/uikit-react/EditUserProfile";
import { EditUserProfileProvider } from "@sendbird/uikit-react/EditUserProfile/context";
import { useEffect, useState } from "react";

const EditProfile = ({ onClose }) => {
  const [userData, setUserData] = useState([])
  const store = useSendbirdStateContext();
  const updateUser = sendbirdSelectors.getUpdateUserInfo(store);
  const user = sendbirdSelectors.getSdk(store);

  useEffect(() => {
    setUserData(user.currentUser)
  },[user])

  const {nickname, profileUrl} = userData

  const getUserProfile = async () => {
    const updateNickname = nickname
    const updateProfileUrl = profileUrl

    try {
      const userResponse = await updateUser(updateNickname, updateProfileUrl);
      console.log(userResponse);
      onClose();
    } catch (err) {
      console.log("Error getting profile", err);
    }
  };

  return (
    <div className="edit-modal">
      <EditUserProfileProvider>
        <EditUserProfile
          onEditProfile={getUserProfile}
          onCancel={() => onClose()}
        />
      </EditUserProfileProvider>
    </div>
  );
};

export default EditProfile;
