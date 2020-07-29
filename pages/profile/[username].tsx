import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Profile } from "../../components/pages/Profile";
import { Meta } from "../../components/templates/Meta";
import { getProfileData } from "../../api/profileData";
import { ProfileData } from "../../models/ProfileData";

const ProfilePage: React.FC<{
  data: InferGetServerSidePropsType<typeof getServerSideProps>;
}> = ({ data }) => {
  const { username, profileDataJson } = data;

  if (!username || !profileDataJson) {
    return null;
  }

  const profileData = new ProfileData(profileDataJson);

  return (
    <>
      <Meta title={username} />
      <Profile username={username as string} profileData={profileData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = params.username as string;
  const profileDataJson = await getProfileData(username);
  return { props: { data: { username, profileDataJson } } };
};

export default ProfilePage;
