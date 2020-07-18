import React from "react";
import Router from "next/router";

import firebase from "../firebase/clientApp";
import { ProfileData } from "../models/ProfileData";

export const useProfileData = (username: string) => {
  const [profileData, setProfileData] = React.useState<ProfileData | null>(null);

  const getDailyCommits = async (username: string) => {
    const getProfileDataHttps = firebase.app().functions("asia-northeast1").httpsCallable("getProfileDataHttps");
    const { data } = await getProfileDataHttps({ username });
    if (data) {
      setProfileData(new ProfileData(data));
    } else {
      await Router.push("/");
    }
  };

  React.useEffect(() => {
    getDailyCommits(username);
  }, [username]);

  return { profileData, getDailyCommits };
};
