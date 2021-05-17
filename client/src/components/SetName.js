import React from "react";
import { getName, setNameLocalStorage } from "../utils/commons";
import { useHistory } from "react-router-dom";

const SetName = () => {
  let history = useHistory();

  const [name, setName] = React.useState(getName());
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleClick() {
    if (!name) {
      alert("이름을 입력해주세요");
      return;
    }
    const result = setNameLocalStorage(name);
    if (result) {
      history.push("/");
    } else {
      alert("이름을 바꾸는데 실패하였습니다.");
    }
  }
  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        name="name"
        value={name}
        style={{ height: 30 }}
        onChange={handleChange}
      />
      <button style={{ height: 35 }} onClick={handleClick}>
        이름 변경
      </button>
    </div>
  );
};

export default SetName;
