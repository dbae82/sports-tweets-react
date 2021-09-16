import { Feed, Segment, Dimmer, Loader, Button } from "semantic-ui-react";

import "./TweetCard.css";

const TweetCard = (props) => {
  const tweetUrl = `https://twitter.com/${props.data.includes.users[0].username}/status/${props.data.data.id}`;

  return (
    <Segment raised>
      <Feed.Event>
        <Feed.Label>
          <img
            src={props.data.includes.users[0].profile_image_url}
            id="twitter-profile-image"
            alt="profile-avatar"
          />{" "}
          @{props.data.includes.users[0].username}
        </Feed.Label>
        <Feed.Content id="tweet-card">
          {props.data.data ? (
            <>
              <Button
                as="a"
                href={tweetUrl}
                content="Go to Tweet"
                labelPosition="right"
                icon="twitter"
                color="green"
                target="_blank"
                floated="right"
              ></Button>
              <p id="tweet-content">{props.data.data.text}</p>
            </>
          ) : (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          )}
        </Feed.Content>
      </Feed.Event>
    </Segment>
  );
};

export default TweetCard;
