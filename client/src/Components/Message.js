import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./message.css";

const Message = ({ user }) => {
  const bottom = useRef();
  const [users, setUsers] = useState();
  const [selected, setSelected] = useState(0);
  const [contact, setContact] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
  const [trigger, setTrigger] = useState(false);

  const getUsers = async () => {
    await Axios.get("/api/users/users").then((res) => {
      setContact(res.data[0]);
      setUsers(res.data.filter((x) => x._id !== user._id));
    });
  };

  const getMessage = async () => {
    await Axios.post("/api/messages/message", {
      users: [user._id, contact._id],
    }).then((res) => {
      console.log(res.data);
      setMessages(res.data);
    });
  };

  function getSender(msg_id) {
      console.log(users[i].id);
      var i = 0;
      if(msg_id === users[i].id){
        console.log(users[i].id);
        return users[i].username;
      } else {
        i++;
      }   
  }

  const sendMessage = async () => {
    if (message.length > 0) {
      messages
        ? await Axios.put(`/api/messages/sendmessage/${messages._id}`, {
            message: {
              by: user._id,
              u_name: user.username,
              message,
              time: `${new Date().toDateString()}`,
            },
          })
        : await Axios.post("/api/messages/newmessage", {
            users: [user._id, contact._id],
            message: {
              by: user._id,
              u_name: user.username,
              message,
              time: `${new Date().toDateString()}`,
            },
          }).then((res) => console.log(res.data));
    }

    setMessage("");
    getMessage();
  };

  useEffect(() => {
    contact && user && getMessage();
    contact && user && getUsers();
    setTimeout(() => {
      setTrigger(!trigger);
    }, 1000);
  }, [users, trigger]);

  useEffect(() => {
    users && selected && getMessage();
  }, [users, selected]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="msg_container">
        {/* <h1 className="title">Your Messages</h1> */}
        <div className="msg_body">
          <div className="contacts">
            <h1 onClick={() => getMessage()}>Fellow squealers</h1>
            {users ? (
              users.length > 0 ? (
                users.map((x, i) => (
                  <div
                    className="contact"
                    style={{
                      background: selected === i && "#4571e7",
                      color: selected === i && "white",
                    }}
                    onClick={() => {
                      setContact(x);
                      setSelected(i);
                      getMessage();
                    }}>
                    <div className="img_holder">
                      <img src="/avatar2.png" />
                    </div>
                    <div className="dets">
                      <h2 className="name">{x.username}</h2>
                      {/* <h2 className="email">email</h2> */}
                    </div>
                  </div>
                ))
              ) : (
                <h1>No users on the platform</h1>
              )
            ) : (
              <i className="fad fa-spin fa-spinner-third fa-x4"></i>
            )}
        </div>
          <div className="chat_box">
            <div
              className="selected_contact"
              style={{ display: "flex", justifyContent: "space-between", padding: "0 5rem" }}>
              
              <h1>Logged in as: </h1>
              <h1>{user && user.username}</h1>
            </div>
            <div className="messages">
              <div ref={bottom}></div>
              {messages && messages.message.length > 0 ? (
                messages.message.map((x) => (
                  <span className={x.by === user._id ? "mine" : "thir"}>
                    <p className="msg">
                      <p className="sender">{x.u_name+" squeals:"}</p>
                      <p className="text">{x.message}</p>
                      <span className="date">{x.date}</span>
                    </p>
                    <div className="img_holder">
                      <img src="/avatar2.png" />
                    </div>
                  </span>
                ))
              ) : (
                <h1>No messages</h1>
              )}
            </div>

            <div className="input">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                maxLength="100" 
                placeholder="Write a message (Max 100 characters)"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <span onClick={sendMessage}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
