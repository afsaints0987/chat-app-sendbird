import { useEffect, useState } from "react";
import { http } from "../config/axios"

export const useCreateUser = () => {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_USER_URL}`);
      const responseData = await response.json();
      const userData = responseData.results[0];
      console.log(userData);
      const { uuid } = userData.login;
      const { first } = userData.name;
      const { large } = userData.picture;
      setUserId(uuid);
      setNickname(first);
      setProfileUrl(large);
    } catch (err) {
      console.log(err);
    }
  };

  const storeUser = async () => {
    try {
      const response = await http.post("/create-user", {
        nickname,
        profile_url: profileUrl,
      });
      console.log("User Created Successfully", response.data);
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  useEffect(() => {
    // Fetch user data
    fetchUserData();
  }, []);

  return {
    userId,
    nickname,
    profileUrl,
    storeUser,
  };
};
