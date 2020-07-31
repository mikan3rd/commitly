import * as admin from "firebase-admin";

import { GithubApiClient } from "./helper/GithubApiClient";
import { commitCollection, userCollection } from "./helper/firestoreCollection";

export const AddComitTopic = "addCommit" as const;

const { FieldValue } = admin.firestore;

export type AddCommitJsonType = {
  repositoryId: string;
  repositoryOwner: string;
  repositoryName: string;
  commitId: string;
};

export type CommitDocType = {
  repositoryId: string;
  commitId: string;
  userId: string;
  extentions: { [k: string]: number };
  totalCommits: number;
  commitTimestamp: Date;
  updatedAt: admin.firestore.FieldValue;
};

export const addCommit = async (json: AddCommitJsonType) => {
  const { repositoryId, repositoryName, repositoryOwner, commitId } = json;

  const client = new GithubApiClient();
  await client.setAppToken();
  await client.setRepositoryInstallationToken(repositoryOwner, repositoryName);

  const {
    data: {
      files,
      committer: { id: userId },
      commit: {
        committer: { date },
      },
      stats: { total: totalCommits },
    },
  } = await client.getCommit(repositoryOwner, repositoryName, commitId);

  const userDocs = await userCollection.where("github.userId", "==", String(userId)).limit(1).get();
  if (userDocs.empty) {
    console.log(`NotFound, userId: ${userId}`);
    return null;
  }

  const extentionDict: { [p: string]: number } = {};
  for (const file of files) {
    const { filename, changes } = file;
    if (changes === 0) {
      continue;
    }
    const result = filename.match(/\.\w+$/);
    let key = "no_extension";
    if (result) {
      key = result[0].replace(".", "");
    }
    if (!extentionDict[key]) {
      extentionDict[key] = 0;
    }
    extentionDict[key] += changes;
  }

  const aggrigateData: CommitDocType = {
    repositoryId,
    commitId,
    userId: String(userId),
    extentions: extentionDict,
    totalCommits,
    commitTimestamp: new Date(date),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await commitCollection.doc(commitId).set(aggrigateData, { merge: true });

  return aggrigateData;
};
