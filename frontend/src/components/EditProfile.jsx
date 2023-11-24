/* eslint-disable react/prop-types */
import { useSendbirdStateContext } from "@sendbird/uikit-react/SendbirdProvider";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import EditUserProfile from "@sendbird/uikit-react/EditUserProfile";
import { EditUserProfileProvider } from "@sendbird/uikit-react/EditUserProfile/context";
import { useEffect, useState } from "react";
import { http } from "../config/axios";

const EditProfile = ({ onClose }) => {
  const [userData, setUserData] = useState([]);
  const store = useSendbirdStateContext();
  const updateUser = sendbirdSelectors.getUpdateUserInfo(store);
  const user = sendbirdSelectors.getSdk(store);

  useEffect(() => {
    setUserData(user.currentUser);
  }, [user]);

  const { nickname, profileUrl } = userData;


  const getUserProfile = async () => {
    const updateNickname = nickname;
    const updateProfileUrl = profileUrl;

    try {
      // Update the user profile in Sendbird
      const userResponse = await updateUser(updateNickname, updateProfileUrl);
      const userId = userResponse.userId
      console.log("User Updated from Sendbird", userResponse);
      // Update the user profile in your backend
      const response = await http.put(`/update-user/${userId}`, {
        nickname: userResponse.nickname,
        profile_url: userResponse.profileUrl,
      });
      console.log('User Updated in Database:', response.data);

      alert('User Updated Successfully!');
      onClose();
    } catch (err) {
      console.log("Error updating user profile", err);
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
