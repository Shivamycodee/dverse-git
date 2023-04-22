import React, { useState, useEffect } from "react";
import Styles from "@/styles/profile.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Avatar, { genConfig } from "react-nice-avatar";

import { useGlobalContext } from "../../context/prime";

function ProfileChange() {


  const [avatars, setAvatars] = useState([]);
  const { setProfileFlag, setAvatarConfig,setUserName } =
    useGlobalContext();
  const [temp, setTemp] = useState(false);
  const [avatar, setAvatar] = useState();
  const [name,setName] = useState();

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      const config = genConfig();
      arr.push(config);
    }

    setAvatars(arr);
  }, []);

  const handleAvatarClick = (config) => {
    if (temp) setTemp(false);
    else {
      setTemp(true);
      setAvatar(config);
    }
  };

  const handleProfileChange = async()=>{

   if(name) await setUserName(name + ".eth");
   await setProfileFlag(false);
   localStorage.setItem("dverseUserName", name + ".eth");

   if(avatar) {
    localStorage.clear();
    localStorage.setItem("dverseIdAvatar", JSON.stringify(avatar));
    setAvatarConfig(avatar);

};
  }



  return (
    <div className={Styles.profileChange}>
      <div className={Styles.avatarList}>
        {avatars.map((config, i) => {
          return (
            <div
            key={i+1}
              onClick={() => handleAvatarClick(config)}
              className={temp && avatar === config && Styles.selectedAvatar}
            >
              <Avatar
                key={i + 1}
                className={Styles.userAvatar}
                style={{
                  width: "7.5rem",
                  height: "7.5rem",
                }}
                {...config}
              />
            </div>
          );
        })}
      </div>

      <div>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={(e)=>setName(e.target.value)}
            placeholder="user name..."
            aria-label="user name..."
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text id="basic-addon2">.eth</InputGroup.Text>
        </InputGroup>
      </div>

      <button
        style={{ marginBottom: 10 }}
        data-label="Register"
        className="rainbow-hover"
        onClick={() => handleProfileChange()}
      >
        <span className="sp">Save Profile</span>
      </button>
      <button
        onClick={() => setProfileFlag(false)}
        data-label="Register"
        className="rainbow-hover"
      >
        <span className="sp">Cancel</span>
      </button>
    </div>
  );
}

export default ProfileChange