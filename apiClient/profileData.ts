import { DailyCommitDocType, dailyCommitCollection, userCollection } from "../firebase/nodeApp";

export const getProfileData = async (username: string) => {
  const userDocs = await userCollection.where("github.username", "==", username).limit(1).get();

  if (userDocs.empty) {
    return null;
  }

  let userData;
  userDocs.forEach((doc) => {
    userData = doc.data();
  });

  const commitDocs = await dailyCommitCollection
    .where("userId", "==", userData.github.userId)
    .orderBy("date", "desc")
    .limit(10)
    .get();

  const commits: DailyCommitDocType[] = [];
  commitDocs.forEach((doc) => {
    const commtiData = doc.data() as DailyCommitDocType;
    commits.push(commtiData);
  });

  return {
    github: { username: userData.github.username },
    twitter: { username: userData.twitter.username },
    commits: commits.map((commit) => {
      const { date, updatedAt } = commit;
      return {
        ...commit,
        date: Math.floor(date.toDate().getTime() / 1000),
        updatedAt: Math.floor(updatedAt.toDate().getTime() / 1000),
      };
    }),
  };
};
