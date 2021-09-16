// import { Router } from "react-router-dom";
import { Container, Image, Grid, Divider, Header, Icon } from "semantic-ui-react";
import RegisterForm from "../components/Forms/RegisterForm";

import background from "../assets/nba-teams.png";
import splashGif from "../assets/splash-card.gif";
import "./home.css";

const Home = (props) => {
  return (
    <div className="home-container">
      <div className="home-container__background">
        <img src={background} alt="nba-teams" id="background-image" />
      </div>
      <Container className="home-container__card">
        <Grid celled>
          <Grid.Column width={10}>
            <Image src={splashGif} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Container fluid>
              <Header as="h3" textAlign="center">
                Welcome to Sports Tweets
              </Header>
              <Divider />
              <p>
                Powered by Twitter <Icon name='twitter' /> Sports Tweets is your one stop shop to read up on all the latest news about your favorite sport. Register below or, if you already have an account with us, log in above.
              </p>
              <RegisterForm push={props.history.push}/>
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
