import { Container, List, Segment } from "semantic-ui-react";

import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Segment vertical>
        <Container textAlign="center">
          <List horizontal divided link size="small">
            <List.Item as="a" href="mailto:dbae82@gmail.com">
              Dan Bae
            </List.Item>
            <List.Item as="a" href="https://www.linkedin.com/in/dan-bae/" target='_blank'>
              <i class="fab fa-linkedin-in"></i>
            </List.Item>
            <List.Item as="a" href="https://github.com/dbae82" target='_blank'>
              <i class="fab fa-github-alt"></i>
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};

export default Footer;
