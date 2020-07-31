import { TwitterClient } from "./helper/TwitterClient";

export const retweetBot = async () => {
  const client = TwitterClient.getBot();
  const { statuses } = await client.searchTweet("#commitly");
  const sortedTweets = statuses.sort((a, b) => (a.favorite_count > b.favorite_count ? -1 : 1));
  const targetTweet = sortedTweets.find((tweet) => !tweet.retweeted);
  if (targetTweet) {
    await client.postRetweet(targetTweet.id_str);
  }
};
