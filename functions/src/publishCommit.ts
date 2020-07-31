import { PubSub } from "@google-cloud/pubsub";

import { AddComitTopic, AddCommitJsonType } from "./addCommit";

export type WebhookPushEventType = {
  repository: {
    id: number;
    full_name: string;
    name: string;
    private: boolean;
    owner: { name: string };
  };
  sender: {
    id: number;
  };
  commits: { id: string; distinct: boolean; committer: { username: string } }[];
};

export const publishCommit = async (body: WebhookPushEventType) => {
  const {
    repository: {
      id: repositoryId,
      name: repositoryName,
      owner: { name: repositoryOwner },
    },
    commits,
  } = body;

  const publishList: AddCommitJsonType[] = [];
  const pubSub = new PubSub();
  for (const commit of commits) {
    const { id: commitId, distinct } = commit;
    if (!distinct) {
      continue;
    }
    const data: AddCommitJsonType = {
      repositoryId: String(repositoryId),
      repositoryOwner,
      repositoryName,
      commitId,
    };
    const dataJson = JSON.stringify(data);
    const dataBuffer = Buffer.from(dataJson);
    await pubSub.topic(AddComitTopic).publish(dataBuffer);
    publishList.push(data);
  }
  return publishList;
};
