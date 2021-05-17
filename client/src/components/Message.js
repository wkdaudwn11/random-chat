import React from "react";
import TextField from "@material-ui/core/TextField";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { getName } from "../utils/commons";

const socket = io("http://192.168.0.11:4000");

export default class Message extends React.Component {
  MAX_SCROLL_HEIGHT = 500;

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      chat: "",
      yourID: getName(),
      messages: [],
      message: "",
    };
    this.keyboard = this.keyboard.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setMessageBoxScroll = this.setMessageBoxScroll.bind(this);
  }

  receiveMessage = (message) => {
    this.setState({
      messages: [...this.state.messages, message],
    });
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  keyboard(e) {
    if (e.keyCode === 13) {
      const messageObject = {
        name: this.state.yourID,
        body: this.state.message,
        id: this.state.yourID,
      };
      this.setState({
        message: "",
      });
      socket.emit("send message", messageObject);
    }
  }

  // 대화박스에 샐운 대화가 추가되어 스크롤이 넘어갔을 경우, 넘어간 만큼 스크롤을 아래로 내려주는 함수
  setMessageBoxScroll() {
    const messageBox = document.getElementById("message-box");
    const scrollHeight = messageBox.scrollHeight;
    if (scrollHeight > this.MAX_SCROLL_HEIGHT) {
      messageBox.scrollTo(0, scrollHeight);
    }
  }

  componentWillMount() {
    socket.on("connect", () => {
      socket.emit("room", "room01");
      socket.on("message", (message) => {
        this.receiveMessage(message);
        this.setMessageBoxScroll();
      });
    });
  }

  render() {
    const { keyboard, onChange } = this;
    return (
      <div style={{ padding: 20 }}>
        <h1>익명 채팅</h1>

        <h4>
          현재 닉네임: {this.state.yourID}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="set-name">
            <button>이름 변경</button>
          </Link>
        </h4>

        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="할 말을 입력하세요."
          onKeyDown={keyboard}
          onChange={onChange}
          value={this.state.message}
          style={{ width: "100%" }}
          name="message"
          label="메세지 입력"
        />
        <div
          id="message-box"
          style={{
            backgroundColor: "#efefef",
            border: "1px solid black",
            height: this.MAX_SCROLL_HEIGHT,
            overflowY: "scroll",
            marginTop: 20,
          }}
        >
          {this.state.messages.map((message) => {
            return (
              <div>
                >&nbsp;
                {message}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
