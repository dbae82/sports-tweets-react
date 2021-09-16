import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { io } from "socket.io-client";

import TweetFeed from "../components/TweetFeed";
import { UserModel } from "../models";

import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

import "./TweetsContainer.css";

const TweetsContainer = (props) => {
  const [user, setUser] = useRecoilState(userState);
  const socket = io("https://sportstweetstwitter.herokuapp.com");
  // const connections = new Set()
  const [tweets, setTweets] = useState([]);

  useEffect(function () {
    fetchTweets();
    if (localStorage.getItem("uid")) {
      UserModel.show().then((json) => {
        setUser(json.data);
      });
    }
    return () => {
      // fetchTweets()
      socket.on("disconnect", () => {
        socket.close();
        console.log("Socket disconnected");
      });
      // connections.delete(socket)
    };
  }, [setUser]);

  console.log(user);

  const fetchTweets = () => {
    // TweetModel.allFake().then((json) => {
    //   setTweets(json.tweets);
    // });
    socket.on("tweet", (tweet) => {
      // console.log(tweet);
      // connections.add(socket)
      // let tweetList = []
      // tweetList.push(tweet)
      // console.log(tweetList, '==============================');
      setTweets((prevState) => [...prevState, tweet]);
    });
  };

  console.log(tweets);
  return (
    <div className="tweets-container">
      <Container className="tweets-feed__hero">
        <h1
          style={{
            background: `linear-gradient(to top, black, transparent), url(${user.favTeam.artUrl})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {user.favTeam.key}
        </h1>
      </Container>
      <TweetFeed tweets={tweets} />
    </div>
  );
};

export default TweetsContainer;
