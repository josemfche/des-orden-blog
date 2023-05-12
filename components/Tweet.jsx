import TweetEmbed from 'react-tweet-embed';

function Tweet({ tweetId }) {
  return (
    <TweetEmbed tweetId={tweetId} options={{ cards: 'hidden' }} />
  );
}

export default Tweet;
