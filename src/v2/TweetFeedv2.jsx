import React, { useEffect, useReducer } from "react";
import Tweet from "./Tweetv2";
import socketIOClient from "socket.io-client";

import RuleList from "./RuleList";

import "./v2.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_tweet":
      return {
        ...state,
        tweets: [action.payload, ...state.tweets],
        error: null,
        isWaiting: false,
        errors: [],
      };
    case "show_error":
      return { ...state, error: action.payload, isWaiting: false };
    case "add_errors":
      return { ...state, errors: action.payload, isWaiting: false };
    case "update_waiting":
      return { ...state, error: null, isWaiting: true };
    default:
      return state;
  }
};

const TweetFeed = () => {
    const initialState = {
        tweets: [],
        error: {},
        isWaiting: true,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { tweets, error, isWaiting } = state;

    const streamTweets = () => {
        let socket;

        socket = socketIOClient('http://localhost:4444');

        socket.on('heartbeat', (data) => {
            dispatch({ type: "update_waiting" });
        });
        socket.on('error', (data) => {
            dispatch({ type: "show_error", payload: data });
        });
        socket.on("authError", (data) => {
            console.log("data =>", data);
            dispatch({ type: "add_errors", payload: [data] });
        });
    };

    useEffect(() => {
        streamTweets();
    }, []);

    const showTweets = () => {
        if (tweets.length > 0) {
            return (
                <React.Fragment>
                    {tweets.map((tweet) => (
                        <Tweet key={tweet.data.id} json={tweet} />
                    ))}
                </React.Fragment>
            );
        }
    };

    return (
        <div>
            <RuleList />
            {showTweets()}
        </div>
    );
};

export default TweetFeed;

