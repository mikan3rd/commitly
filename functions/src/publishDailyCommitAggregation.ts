import { PubSub } from "@google-cloud/pubsub";

import { AggregateDailyCommitJsonType, AggregateDailyCommitTopic } from "./aggregateDailyCommit";
import { userCollection } from "./helper/firestoreCollection";

export type UserDataType = {
  github: GithubDataType;
  twitter: TwitterDataType;
  updatedAt: Date;
  createdAt: Date;
};

type GithubDataType = {
  username: string;
  userId: string;
  accessToken: string;
};

type TwitterDataType = {
  username: string;
  userId: string;
  accessToken: string;
  secret: string;
};

export const publishDailyCommitAggregation = async () => {
  const users: UserDataType[] = [];

  const userDocs = await userCollection.get();
  userDocs.forEach((doc) => {
    const user = doc.data() as UserDataType;
    users.push(user);
  });

  const pubSub = new PubSub();
  for (const user of users) {
    const data: AggregateDailyCommitJsonType = { userId: user.github.userId };
    const dataJson = JSON.stringify(data);
    const dataBuffer = Buffer.from(dataJson);
    await pubSub.topic(AggregateDailyCommitTopic).publish(dataBuffer);
  }
};
