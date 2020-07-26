import { immerable } from "immer";
import dayjs, { Dayjs } from "dayjs";

class ProfileGithubData {
  [immerable] = true;

  username: string;

  constructor({ ...params }) {
    const { username } = params;
    this.username = username;
  }
}

class ProfileTwitterData {
  [immerable] = true;

  username: string;

  constructor({ ...params }) {
    const { username } = params;
    this.username = username;
  }
}

class ExtentionData {
  [immerable] = true;

  name: string;
  lineNum: number;

  constructor({ ...params }) {
    const { name, lineNum } = params;
    this.name = name;
    this.lineNum = lineNum;
  }
}

class ProfileCommitData {
  [immerable] = true;

  date: Dayjs;
  totalCommits: number;
  extentions: ExtentionData[];

  constructor({ ...params }) {
    const { date, totalCommits, extentions } = params;
    this.date = dayjs.unix(date);
    this.totalCommits = totalCommits;
    this.extentions = Object.entries(extentions).map(([name, lineNum]) => new ExtentionData({ name, lineNum }));
  }

  sortedExtensions() {
    return this.extentions.sort((a, b) => (a.lineNum > b.lineNum ? -1 : 1));
  }
}

export class ProfileData {
  [immerable] = true;

  github: ProfileGithubData;
  twitter: ProfileTwitterData;
  commits: ProfileCommitData[];

  constructor({ ...params }) {
    const { github, twitter, commits = [] } = params;
    this.github = new ProfileGithubData(github);
    this.twitter = new ProfileTwitterData(twitter);
    this.commits = commits.map((commit) => new ProfileCommitData(commit));
  }
}
