import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Data Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="data-name">Name</Label>
              <Input
                type="text"
                id="data-id"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Data Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="data-age">Age</Label>
              <Input
                type="text"
                id="data-id"
                name="age"
                value={this.state.activeItem.age}
                onChange={this.handleChange}
                placeholder="Enter Data age"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="presente"
                  checked={this.state.activeItem.presenza}
                  onChange={this.handleChange}
                />
                Presente
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}