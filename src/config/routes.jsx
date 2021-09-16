import { Switch, Route, Redirect } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { loggedInState } from "../recoil/selectors";

import Home from "../pages/Home";
import TweetsContainer from "../pages/TweetsContainer";
import Profile from "../pages/Profile";

const Routes = (props) => {
  const isLoggedIn = useRecoilValue(loggedInState);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/feed" component={TweetsContainer} />
          <Route exact path='/profile/:id' component={Profile} />
        </Switch>
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  );
};

export default Routes;
