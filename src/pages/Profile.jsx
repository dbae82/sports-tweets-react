import { useEffect, useState } from "react";
import { UserModel, TeamModel } from "../models";
import {
  Container,
  Grid,
  Image,
  Header,
  Menu,
  Segment,
  Form,
  TextArea,
  Button,
  Modal,
  Input,
  Dropdown,
} from "semantic-ui-react";

import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

import "./profile.css";

const Profile = (props) => {
  const [open, setOpen] = useState(false);
  const [item, itemClick] = useState("bio");
  const [user, setUser] = useRecoilState(userState);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [favTeams, setFavTeams] = useState("");
  const [favTeam, setFavTeam] = useState(user.favTeam);
  const [error, setError] = useState("");
  const [displayBio, setDisplayBio] = useState(user.bio);

  useEffect(
    function () {
      if (localStorage.getItem("uid")) {
        UserModel.show().then((json) => {
          setUser(json.data);
        });
      }
    },
    [user]
  );

  useEffect(() => {
    TeamModel.all().then((json) => {
      setFavTeams(json.teams);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const update = { bio, avatar, favTeam };
    UserModel.update(props.match.params.id, update).then((json) => {
      if (json.status === 500) {
        setError(json.message);
      }
      if (json.status === 200) {
        setDisplayBio(bio);
        itemClick("bio");
      }
    });
  }

  function handleChange(event) {
    event.preventDefault();
    const foundTeam = favTeams.filter(function (value, index) {
      if (value.key === event.target.innerText) return true;
    });
    setFavTeam(foundTeam[0]._id);
  }

  const deleteUser = (event) => {
    UserModel.delete(props.match.params.id).then((json) => {
      localStorage.clear();
      setUser(null);
      props.history.push("/");
    });
  };

  return (
    // <body style={{ background: 'rgb(248, 130, 20)', color: 'rgb(248, 130, 20)'}}>
      <Container className="profile-container">
        <div className="profile-container__hero">
          <img src={user.favTeam.artUrl} alt='favorite-sport' />
        </div>
        <Grid>
          <Grid.Column width={5}>
            <Image
              circular
              src={user.avatar}
              size="medium"
              id="profile-avatar"
            />
            <Header as="h1" textAlign="center" id="profile-username">
              {user.username}
            </Header>
          </Grid.Column>
          <Grid.Column width={11}>
            <Menu pointing secondary size="huge">
              <Menu.Item
                as="a"
                name="bio"
                active={item === "bio"}
                onClick={() => itemClick("bio")}
              />
              <Menu.Item
                as="a"
                name="favorite sport"
                active={item === "favorite team"}
                onClick={() => itemClick("favorite team")}
              />
              <Menu.Menu position="right">
                <Menu.Item
                  as="a"
                  name="update"
                  active={item === "update"}
                  onClick={() => itemClick("update")}
                />
              </Menu.Menu>
            </Menu>
            {item === "bio" ? (
              <Segment raised className="profile-container__segment">
                {user.bio === undefined ? (
                  <h3>Update your bio to tell us a little about yourself 👍</h3>
                ) : (
                  <h3>{displayBio}</h3>
                )}
              </Segment>
            ) : item === "favorite team" ? (
              <Segment raised className="profile-container__segment">
                <h3>{user.favTeam.value}</h3>
              </Segment>
            ) : (
              <Segment raised className="profile-container__segment">
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                    <label htmlFor="bio">Bio</label>
                    <TextArea
                      placeholder="Tell us about yourself"
                      type="text"
                      name="bio"
                      onChange={(e) => setBio(e.target.value)}
                      value={bio}
                    />
                  </Form.Field>
                  {/* <Divider /> */}
                  <Form.Field>
                    <label htmlFor="avatar">Avatar</label>
                    <Input
                      placeholder="http://"
                      icon="user"
                      type="text"
                      name="avatar"
                      onChange={(e) => setAvatar(e.target.value)}
                      value={avatar}
                    />
                  </Form.Field>
                  {/* <Divider /> */}
                  <Form.Field>
                    <label htmlFor="favTeam">Favorite Sport</label>
                    <Dropdown
                      placeholder="Select Your Favorite Sport"
                      fluid
                      selection
                      options={favTeams}
                      onChange={handleChange}
                    />
                  </Form.Field>
                  <Button floated="right" type="submit" positive value="Update">
                    Update
                  </Button>
                </Form>
                <Button
                  floated="right"
                  type="delete"
                  negative
                  value="Delete"
                  onClick={() => setOpen(true)}
                >
                  Deactivate
                </Button>
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  size="mini"
                  open={open}
                >
                  <Modal.Header>Deactivate Your Account</Modal.Header>
                  <Modal.Content>
                    <p>Are you sure you want to deactivate your accout?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="black" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      content="Confirm"
                      labelPosition="right"
                      icon="delete"
                      onClick={deleteUser}
                      negative
                      type="submit"
                      value="Delete"
                    />
                  </Modal.Actions>
                </Modal>
              </Segment>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    // </body>
  );
};

export default Profile;
