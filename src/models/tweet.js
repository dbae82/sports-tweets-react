import tweets from '../db/tweets.json';
// import tweets2 from '../db/tweets2.json';

const url = 'https://api.twitter.com/2/tweets/search/';
const testQuery = 'recent?query=%23knicks%20lang%3Aen%20-is%3Aretweet&max_results=10&expansions=author_id&tweet.fields=created_at,lang,conversation_id&user.fields=created_at,entities';
const token = process.env.TWITTER_BEARER_TOKEN;

class TweetModel {
    static getTweets() {
        return fetch(`${url}${testQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(respose => respose.json());
    };

    static allFake() {
        return Promise.resolve({ tweets });
    };
};

export default TweetModel;