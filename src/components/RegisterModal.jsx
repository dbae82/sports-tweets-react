import React, { useState } from "react";
import { Button, Menu, Modal } from "semantic-ui-react";

import RegisterForm from "./Forms/RegisterForm";

const RegisterModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<button>Register</button>}
    >
      <Modal.Header>Register</Modal.Header>
      <Modal.Content>
        <RegisterForm />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RegisterModal;