import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // https://stackoverflow.com/a/41044630/1332513
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const UserCollectionPath = "users" as const;
export const CommitsCollectionPath = "commits" as const;
export const DailyCommitsCollectionPath = "dailyCommits" as const;

export type DailyCommitDocType = {
  userId: string;
  extentions: { [k: string]: number };
  totalCommits: number;
  date: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
};

export default admin;
