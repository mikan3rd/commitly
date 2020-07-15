import dayjs, { Dayjs } from "dayjs";
import { immerable, produce } from "immer";

import firebase from "../firebase/clientApp";

class Github {
  [immerable] = true;

  userId: string;
  username: string;
  accessToken: string;

  constructor({ ...params }) {
    const { userId = "", username = "", accessToken = "" } = params;
    this.userId = userId;
    this.username = username;
    this.accessToken = accessToken;
  }

  getFirestoreObject() {
    const { userId, username, accessToken } = this;
    return { userId, username, accessToken };
  }
}

class Twitter {
  [immerable] = true;

  userId: string;
  username: string;
  accessToken: string;
  secret: string;

  constructor({ ...params }) {
    const { userId = "", username = "", accessToken = "", secret = "" } = params;
    this.userId = userId;
    this.username = username;
    this.accessToken = accessToken;
    this.secret = secret;
  }

  getFirestoreObject() {
    const { userId, username, accessToken, secret } = this;
    return { userId, username, accessToken, secret };
  }
}

class Setting {
  tweetTime: number;

  constructor({ ...params }) {
    const { tweetTime = 21 } = params;
    this.tweetTime = tweetTime;
  }

  getFirestoreObject() {
    const { tweetTime } = this;
    return { tweetTime };
  }
}

export class User {
  [immerable] = true;

  github: Github;
  twitter: Twitter;
  setting: Setting;
  updatedAt: Dayjs | null;
  createdAt: Dayjs | null;

  constructor({ ...params }) {
    const { github, twitter, setting, updatedAt, createdAt } = params;
    this.github = new Github(github);
    this.twitter = new Twitter(twitter);
    this.setting = new Setting(setting);
    this.updatedAt = updatedAt ? dayjs(updatedAt.toDate()) : null;
    this.createdAt = createdAt ? dayjs(createdAt.toDate()) : null;
  }

  getFirestoreObject() {
    const { github, twitter, setting } = this;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const userDoc = {
      github: github.getFirestoreObject(),
      twitter: twitter.getFirestoreObject(),
      setting: setting.getFirestoreObject(),
      updatedAt: timestamp,
      createdAt: timestamp,
    };
    if (this.createdAt) {
      delete userDoc.createdAt;
    }
    return userDoc;
  }

  setGithub({ userId, username, accessToken }: { userId: string; username: string; accessToken: string }) {
    return produce(this, (draftState) => {
      draftState.github = new Github({ userId, username, accessToken });
    });
  }

  setTwitter({
    userId,
    username,
    accessToken,
    secret,
  }: {
    userId: string;
    username: string;
    accessToken: string;
    secret: string;
  }) {
    return produce(this, (draftState) => {
      draftState.twitter = new Twitter({ userId, username, accessToken, secret });
    });
  }

  clearTwitter() {
    return produce(this, (draftState) => {
      draftState.twitter = new Twitter({});
    });
  }

  setSettingTweetTime(tweetTime: number) {
    return produce(this, (draftState) => {
      draftState.setting.tweetTime = tweetTime;
    });
  }
}
