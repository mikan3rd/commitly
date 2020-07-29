import * as admin from "firebase-admin";

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // https://stackoverflow.com/a/41044630/1332513
      privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

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
  date: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
};

export default admin;
