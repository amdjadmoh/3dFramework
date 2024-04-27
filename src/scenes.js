import React, { useEffect, useRef, useState } from "react";
import Aframe from "aframe";

function getScene(id, scenes) {

  return scenes.find((element) => element._id === id);
}

function Scenes({ setcurrent, resetCircle }) {
  let [global, setGlobal] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/scenes")
      .then((result) => result.json())
      .then((result) => {
        setGlobal(result.data.Scenes);
      });
  }, []);
  let images = global
    ? global.map((item) => (
        <img
          key={item._id}
          src={"http://localhost:5000/" + item.imageLink}
          alt="loading"
          onClick={() => {
            console.log("here", getScene(item._id, global));
            resetCircle();
            setcurrent(getScene(item._id, global));
          }}
        ></img>
      ))
    : null;

  return <div className="scenes">{global ? images : "loading"}</div>;
}

export default Scenes;
