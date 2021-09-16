import React, { useState, useEffect } from "react";
import { AuthModel, UserModel } from "../../models";
import { NavLink } from "react-router-dom";
import {
  Container,
  Menu,
  Button,
  Modal,
  Form,
  Input,
  Image,
  Message,
} from "semantic-ui-react";

import { userState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

import "./nav.css";

const Nav = (props) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useRecoilState(userState);

  useEffect(function () {
    if (localStorage.getItem("uid")) {
      UserModel.show().then((json) => {
        setUser(json.data);
      });
    }
  }, [setUser]);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  function handleSubmit(event) {
    setError("");
    event.preventDefault();
    const credentials = { username, password };

    AuthModel.login(credentials).then((json) => {
      if (json.status === 400) {
        setError(json.message);
      }

      if (json.status === 200) {
        localStorage.setItem("uid", json.token);
        UserModel.show().then((json) => {
          setUser(json.data);
          setOpen(false);
        });
      }
    });
  }

  return (
    <div className="nav-bar">
      <Menu fixed="top">
        <Container>
          <NavLink exact to="/">
            <Menu.Item as="a" header>
              <i class="fab fa-twitter fa-3x"></i>
              Sports Tweets
            </Menu.Item>
          </NavLink>
          {user ? (
            <>
              <NavLink exact to="/feed">
                <Menu.Item as="a" id="feed-link">
                  Feed
                </Menu.Item>
              </NavLink>
              <Menu.Item onClick={logout} as="a" position="right">
                Logout
              </Menu.Item>
              <NavLink exact to={`/profile/${user._id}`}>
                <Menu.Item as="a" id="profile-link">
                  <Image src={user.avatar} size="mini" circular />
                </Menu.Item>
              </NavLink>
            </>
          ) : (
            <Menu.Item onClick={() => setOpen(true)} as="a" position="right">
              Login
            </Menu.Item>
          )}
        </Container>
      </Menu>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="tiny"
      >
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
          {!error ? (
            <></>
          ) : (
            <Message
              error
              header="Please try again"
              content="Username or password are incorrect, please try again"
            />
          )}
          <Form onSubmit={handleSubmit}>
            {!error ? (
              <>
                <Form.Field>
                  <label htmlFor="username">Username</label>
                  <Input
                    placeholder="Username"
                    icon="user"
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">Password</label>
                  <Input
                    placeholder="Password"
                    icon="lock"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Field>
              </>
            ) : (
              <>
                <Form.Field>
                  <label htmlFor="username">Username</label>
                  <Form.Input
                    error
                    placeholder="Username"
                    icon="user"
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">Password</label>
                  <Form.Input
                    error
                    placeholder="Password"
                    icon="lock"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Field>
              </>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Log In"
            labelPosition="right"
            icon="checkmark"
            onClick={handleSubmit}
            positive
            type="submit"
            value="Login"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Nav;
