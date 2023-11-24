import { useEffect, useState, useCallback } from "react";
import { http } from "../config/axios";

export const useCreateUser = () => {
  const [userData, setUserData] = useState({
    userId: "",
    nickname: "",
    profileUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAndSaveUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await http.get(`${import.meta.env.VITE_USER_URL}`);
      const userDataResponse = await response.data;

      const { login, name, picture } = userDataResponse.results[0];
      const userId = login.uuid;
      const nickname = name.first;
      const profileUrl = picture.large;

      await http.post("/create-user", {
        user_identifier: userId,
        nickname,
        profile_url: profileUrl,
      });

      console.log("User created successfully!");
      alert("New User Created")

      setUserData({
        userId,
        nickname,
        profileUrl,
      });
    } catch (error) {
      console.error("Error creating user", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, so the function won't be recreated

  useEffect(() => {
    fetchAndSaveUser();
  }, [fetchAndSaveUser]);

  return { userData, loading, error };
};
