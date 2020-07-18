import React from "react";

import firebase from "../firebase/clientApp";
import { ProfileData } from "../models/ProfileData";

export const getProfileData = async (username: string) => {
  const getProfileDataHttps = firebase.app().functions("asia-northeast1").httpsCallable("getProfileDataHttps");
  const { data } = await getProfileDataHttps({ username });
  return data;
};

export const useProfileData = (username: string) => {
  const [profileData, setProfileData] = React.useState<ProfileData | null>(null);

  const getDailyCommits = async (username: string) => {
    const data = await getProfileData(username);
    if (data) {
      setProfileData(new ProfileData(data));
    } else {
      setProfileData(null);
    }
  };

  React.useEffect(() => {
    getDailyCommits(username);
  }, [username]);

  return { profileData, getDailyCommits };
};
