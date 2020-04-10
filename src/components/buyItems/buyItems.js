import React from "react";
import Header from "../layouts/header";
import { customerRef } from "../../firebase";
import { Input, Button } from "antd";

export default class BuyItems extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      contact: "",
      address: "",
      loading: false,
      iconLoading: false,
      showAlert: false,
      alertText: "",
      type: ""
    };
  }
  writeUserData = () => {
    const { email, fullName, contact, address } = this.state;
    customerRef.push().set({ email, fullName, contact, address });
    this.setState({
      loading: true,
      showAlert: true,
      alertText:
        "Your request is submitted, we will shortly add you to our whatsApp group.",
      type: "success"
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  enterLoading = () => {
    const { email, fullName, contact, address } = this.state;

    if (email !== "" && fullName !== "" && contact !== "" && address !== "") {
      this.writeUserData();
    } else {
      this.setState({
        showAlert: true,
        alertText: "Please fill all the details above before submitting",
        type: "danger"
      });
      setTimeout(() => {
        this.setState({ loading: false, showAlert: false });
      }, 5000);
    }
  };
  handleChange = e => {
    const label = e.target.id;
    this.setState({
      [label]: e.target.value
    });
  };

  render() {
    const { showAlert, alertText, type } = this.state;
    return (
      <div>
        <Header isActive={"items"} />

        <div className="row">
          <div className="col">
            <h1 style={{ marginBottom: "5%" }}>Submit Your Request Here</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Input
              placeholder="Enter your Fullname"
              className="inputStyle"
              id="fullName"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Input
              placeholder="Enter your Email"
              id="email"
              className="inputStyle"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Input
              placeholder="Enter your WhatsApp Number"
              id="contact"
              className="inputStyle"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Input
              placeholder="Enter your Address"
              id="address"
              className="inputStyle"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={this.enterLoading}
              style={{ marginBottom: "5%" }}
            >
              Submit
            </Button>{" "}
          </div>
        </div>
        {showAlert && (
          <div class={`alert alert-${type}`} role="alert">
            {alertText}
          </div>
        )}
      </div>
    );
  }
}
