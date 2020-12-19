import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import "./sign.css";
import Message from "./Message";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const Signinhandler = async () => {
    await Axios.post("/api/users/signin", {
      username,
      password,
    }).then((res) => setUser(res.data));
  };

  return !user ? (
    <>
      <div className="signin_holder">
        <div className="left">
          <img src="/lokki.png" alt="bird.png" />
        </div>
        <div className="right">
          <div className="form_holder">
            <h3 className="title">Welcome to Seagull's squeal</h3>
              <h4 className= "subtitle">Log in with credentials or create an account</h4>
            <div className="form">
              <TextField
                label="Username"
                variant="outlined"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={Signinhandler}>Log in / Register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Message user={user} />
  );
};

export default Signin;
