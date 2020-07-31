import * as dayjs from "dayjs";

import { UserDataType } from "./publishDailyCommitAggregation";
import { TwitterClient } from "./helper/TwitterClient";
import { DailyCommitDocType, dailyCommitCollection } from "./helper/firestoreCollection";

export const TweetDailyTopic = "tweetDailyTopic" as const;

export const tweetDaily = async (json: UserDataType) => {
  const {
    twitter: { accessToken, secret, username: twitterUsername },
    github: { userId, username: githubUsername },
  } = json;

  const date = dayjs().add(9, "hour").startOf("day").subtract(1, "day");
  const docs = await dailyCommitCollection
    .where("userId", "==", userId)
    .where("date", "==", date.toDate())
    .limit(1)
    .get();

  if (docs.empty) {
    console.log(`NotFound, userId: ${userId}`);
    return;
  }

  let dailyData: DailyCommitDocType;
  docs.forEach((doc) => {
    dailyData = doc.data() as DailyCommitDocType;
  });

  const { totalCommits, extentions } = dailyData;

  const mainObject: { [key: string]: number } = {};
  const subObject: { [key: string]: number } = {};

  Object.entries(extentions).forEach(([extention, value]) => {
    const language = extentionsDict[extention];
    if (language) {
      if (!mainObject[language]) {
        mainObject[language] = 0;
      }
      mainObject[language] += value;
    } else {
      const key = extention ? `.${extention}` : "その他";
      if (!subObject[key]) {
        subObject[key] = 0;
      }
      subObject[key] += value;
    }
  });

  const mainList = Object.entries(mainObject)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => (a.value > b.value ? -1 : 1))
    .map(({ key, value }) => `${key}: ${value}`);

  const subList = Object.entries(subObject)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => (a.value > b.value ? -1 : 1))
    .map(({ key, value }) => `${key}: ${value}`);

  // TODO: ハッシュタグをつける

  const contetnList = [
    `${date.format("YYYY年M月D日(ddd)")}`,
    `@${twitterUsername} は${totalCommits}行のコードを書きました！`,
    "",
    ...mainList,
    "",
    ...subList,
    "",
    "#commitly",
    `https://commitly-next-web.vercel.app/profile/${githubUsername}`,
  ];
  const status = contetnList.join("\n");

  const client = TwitterClient.get(accessToken, secret);
  await client.postTweet(status);
};

const extentionsDict = {
  py: "Python",
  js: "JavaScript",
  ts: "TypeScript",
  jsx: "JavaScript",
  tsx: "TypeScript",
  vue: "Vue",
  rb: "Ruby",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  php: "PHP",
  go: "Go",
  sh: "ShellScript",
  java: "Java",
  c: "C",
  cpp: "C++",
  cs: "C#",
  cobol: "COBOL",
  coffee: "CoffeeScript",
  hs: "Haskell",
  lisp: "Lisp",
  sql: "SQL",
  m: "Objective-C",
  pl: "Perl",
  r: "R",
  rs: "Rust",
  scala: "Scala",
  json: "JSON",
  md: "Markdown",
  yaml: "YAML",
  yml: "YAML",
  no_extension: "その他",
};
