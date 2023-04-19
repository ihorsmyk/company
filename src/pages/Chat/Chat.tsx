import React, { FC } from "react";
import { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { toast } from "react-toastify";
import "./Chat.scss";

let stompClient = over(
  new SockJS("http://ec2-3-129-6-39.us-east-2.compute.amazonaws.com:8081/ws/")
);

const ChatRoom: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [privateChats, setPrivateChats] = useState<any>(new Map());
  const [publicChats, setPublicChats] = useState<any>([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const connect = (): void => {
    let Sock = new SockJS(
      "http://ec2-3-129-6-39.us-east-2.compute.amazonaws.com:8081/ws"
    );
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = (): void => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = (): void => {
    const chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload: any): void => {
    const payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload: any) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (error: any) => {
    setError(error);
  };

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = (): void => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = (): void => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = (): void => {
    connect();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className="chat__room"
              >
                users:
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className="chat__members"
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat__content">
              <ul className="chat__messages">
                {publicChats.map((chat: any, index: number) => (
                  <li className="chat__message" key={index}>
                    {chat.senderName !== userData.username && (
                      <p className="chat__sender">{chat.senderName + ":"}</p>
                    )}
                    {chat.senderName === userData.username && (
                      <p className="chat__sender">{chat.senderName + ":"}</p>
                    )}
                    <p className="chat__message-data">{chat.message}</p>
                  </li>
                ))}
              </ul>

              <div className="chat__send-message">
                <input
                  type="text"
                  className="chat__input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="chat__send-btn"
                  onClick={sendValue}
                >
                  SEND
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="chat__send-message">
                <input
                  type="text"
                  className="chat__input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="chat__send-btn"
                  onClick={sendPrivateValue}
                >
                  SEND
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="chat__register">
          <input
            className="chat__input"
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
          />
          <button className="chat__btn" type="button" onClick={registerUser}>
            CONNECT
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
