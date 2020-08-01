import * as admin from "firebase-admin";
import * as dayjs from "dayjs";

import { CommitDocType } from "./addCommit";
import { DailyCommitDocType, commitCollection, dailyCommitCollection } from "./helper/firestoreCollection";

export const AggregateDailyCommitTopic = "aggregateDailyCommitTopic" as const;
const { FieldValue } = admin.firestore;

export type AggregateDailyCommitJsonType = { userId: string };

export const aggregateDailyCommit = async (json: AggregateDailyCommitJsonType) => {
  const { userId } = json;

  const today = dayjs().add(9, "hour").startOf("day");
  const endTime = today.subtract(9, "hour");
  const startTime = endTime.subtract(1, "day");
  const commitDocs = await commitCollection
    .where("userId", "==", userId)
    .where("commitTimestamp", ">=", startTime.toDate())
    .where("commitTimestamp", "<", endTime.toDate())
    .get();

  if (commitDocs.empty) {
    console.log(`NotFound, userId: ${userId}`);
    return null;
  }

  let totalCommits = 0;
  const extentionDict: { [p: string]: number } = {};
  commitDocs.forEach((doc) => {
    const commit = doc.data() as CommitDocType;
    totalCommits += commit.totalCommits;
    for (const [key, value] of Object.entries(commit.extentions)) {
      if (!extentionDict[key]) {
        extentionDict[key] = 0;
      }
      extentionDict[key] += value;
    }
  });

  const aggrigateData: DailyCommitDocType = {
    userId,
    extentions: extentionDict,
    totalCommits,
    date: today.subtract(1, "day").toDate(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await dailyCommitCollection.doc().set(aggrigateData, { merge: true });

  return aggrigateData;
};
