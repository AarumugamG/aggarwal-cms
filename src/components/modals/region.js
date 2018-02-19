import React from "react";
import { Modal, Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import axios from 'axios';

const statusOptions = ["SHOW", "HIDE"];

class ModalWrap extends React.Component {
	constructor(props) {
		super(props);
    this.state ={
      salesmanId: [],
      sellerName:[],
    }
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
	}
	close() {
		this.props.close();
	}
	handleChange(e) {
		this.props.handleChange(e);
	}
  onSelect(e) {
    this.props.handleSubmit(e);
  }
  handleSubmit(e) {
    this.props.handleSubmit(e);
  }
  render() {
  	const { showModal, stateField, title } = this.props;
    const { salesmanId, sellerName } = this.state;
    return <Modal show={showModal} onHide={this.close.bind(this)}>
      <Modal.Body>
        <h3>{title}</h3>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              Region Name
            </Col>
            <Col sm={7}>
              <FormControl value={stateField.regionName} name="regionName" type="text" placeholder="Name" onChange={this.handleChange} />                  
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              Salesman name
            </Col>
            <Col sm={7}>
              <Dropdown options={sellerName} value={stateField.sellerName} name="sellerName" onChange={this.onSelect}  placeholder="Select an option" />                
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={7}>
              <Button type="submit">
                Update
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>;
  }
}

export default ModalWrap;