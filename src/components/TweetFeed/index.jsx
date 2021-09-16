import { Feed, Container } from "semantic-ui-react";
import TweetCard from "./TweetCard";

import "./TweetFeed.css";

const TweetFeed = (props) => {
  const generateTweets = () => {
    return props.tweets.map((tweet) => <TweetCard key={tweet.data.id} data={tweet} />);
  };
  return (
    <div>
      <Container>
        <Feed>{generateTweets()}</Feed>
      </Container>
    </div>
  );
};

export default TweetFeed;
