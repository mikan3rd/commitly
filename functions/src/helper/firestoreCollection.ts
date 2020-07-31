import * as admin from "firebase-admin";

const UserCollectionPath = "users" as const;
const CommitsCollectionPath = "commits" as const;
const DailyCommitsCollectionPath = "dailyCommits" as const;

export const userCollection = admin.firestore().collection(UserCollectionPath);
export const commitCollection = admin.firestore().collection(CommitsCollectionPath);
export const dailyCommitCollection = admin.firestore().collection(DailyCommitsCollectionPath);

export type DailyCommitDocType = {
  userId: string;
  extentions: { [k: string]: number };
  totalCommits: number;
  date: Date;
  updatedAt: admin.firestore.FieldValue;
};
