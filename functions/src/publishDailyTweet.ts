import { PubSub } from "@google-cloud/pubsub";
import * as dayjs from "dayjs";

import { TweetDailyTopic } from "./tweetDaily";
import { userCollection } from "./helper/firestoreCollection";
import { UserDataType } from "./publishDailyCommitAggregation";

export const publishDailyTweet = async () => {
  const users: UserDataType[] = [];

  const currentHour = dayjs().add(9, "hour").hour();
  const userDocs = await userCollection
    .where("setting.tweetTime", "==", currentHour)
    .where("twitter.userId", ">", "")
    .get();
  userDocs.forEach((doc) => {
    const user = doc.data() as UserDataType;
    users.push(user);
  });

  const pubSub = new PubSub();
  for (const user of users) {
    const dataJson = JSON.stringify(user);
    const dataBuffer = Buffer.from(dataJson);
    await pubSub.topic(TweetDailyTopic).publish(dataBuffer);
  }
};
