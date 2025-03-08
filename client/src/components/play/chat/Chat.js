/*IMPORTS*/
import React, { useState, useEffect, useContext } from "react";
import Input from "./input/Input";
import Message from "./Messages/Message";
import { UserContext } from "../../../UserContext";
import EventLogDisplay from "./EventLogDisplay.js";

const Chat = ({ socket, room_id }) => {
  const [eventLog, setEventLog] = useState([]);

  const logEvent = (eventName) => {
    setEventLog((currentLog) => [
      ...currentLog,
      { eventName, timestamp: new Date() },
    ]);
  };

  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  //to store in input FORM
  const [message, setMessage] = useState("");
  //array to store message
  const [messages, setMessages] = useState([]);

  //function that sends message to server
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    //emit messsage to sokcet server
    const msg = {
      message,
      name: user.name,
      user_id: user.id,
      room_id,
    };

    // console.log(msg);
    socket.emit("sendMessage", msg);
    logEvent("message-send", msg);
    setMessage("");
  };

  useEffect(() => {
    socket.on("messageReceived", (message) => {
      logEvent("message-recieved", message);
      setMessages((msgs) => [...msgs, message]);
    });
    // eslint-disable-next-line
  }, []);

  return (
<>
      <div> 
        {" "}
      </div>

      <div>
        <EventLogDisplay log={eventLog} title={"Socket Log Events for Chat"}/>
        <Message Messages={messages} user={user} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
};

export default Chat;
