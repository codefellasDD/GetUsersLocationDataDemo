import React, { Component } from "react";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.getUser = this.getUser.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.state = {
      users: [],
      lat: String,
      lng: String
    };
  }

  componentDidMount() {
    this.getUser();
    this.getLocation();
  }

  async getUser() {
    let usersData = await axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState(
      {
        users: usersData
      },
      () => {
        console.log(this.state);
      }
    );
  }

  async getLocation() {
    let position = await Geolocation.getCurrentPosition();

    this.setState(
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      () => {
        console.log(this.state.lat);
      }
    );
  }

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        {users &&
          users.map((user) => {
            return (
              <div className="row row-cols-1 row-cols-md-2">
                <div className="col mb-4 ml-5 ">
                  <div className="card shadow-lg border-info w-75">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="card-img"
                          style={{ width: "150px" }}
                        />
                      </div>
                      <div className="col-md-8 p-2">
                        <div className="card-body">
                          <h5 className="card-title">{user.first_name}</h5>
                          <p className="card-text">{user.email}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              Position: {this.state.lat} {this.state.lng}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
