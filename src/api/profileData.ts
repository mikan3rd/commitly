import firebase from "../firebase/clientApp";

export const getProfileData = async (username: string) => {
  const getProfileDataHttps = firebase.app().functions("asia-northeast1").httpsCallable("getProfileDataHttps");
  const { data } = await getProfileDataHttps({ username });
  return data;
};
