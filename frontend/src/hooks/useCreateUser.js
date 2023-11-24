import { useEffect, useState } from "react";
import { http } from "../config/axios";

export const useCreateUser = () => {
  const [userData, setUserData] = useState({
    userId: "",
    nickname: "",
    profileUrl: ""
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchAndSaveUser = async () => {
      try {
        // Fetch user data
        const response = await fetch(`${import.meta.env.VITE_USER_URL}`);
        const userDataResponse = await response.json();

        // Extract relevant user information
        const { login, name, picture } = userDataResponse.results[0];
        const userId = login.uuid
        const nickname = name.first;
        const profileUrl = picture.large;

        // Save user data to the backend
        await http.post("/create-user", {
          user_identifier: userId,
          nickname,
          profile_url: profileUrl
        });

        console.log("User created successfully!");

        // Update the state with user data
        setUserData({
          userId,
          nickname,
          profileUrl,
        });
        setLoading(false)
      } catch (error) {
        console.error("Error creating user", error);
      }
    };

    // Call the function to fetch and save user data
    fetchAndSaveUser();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return {userData, loading};
};
