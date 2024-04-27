import React, { useCallback, useEffect, useRef, useState } from "react";
import Aframe from "aframe";
import "./index.css";
import Spheres from "./spheres";
import Scenes from "./scenes";
import Selection from "./selection";

function Model() {
  let [current, setcurrent] = useState(null);
  let [show, setShow] = useState(true)

  let global = useRef(null);
  let lastId = useRef(7);
  let circle = useRef(null);
  let sceneref = useRef(null);
  let changes = useRef([]);

  let handleskyclick = (event) => {
    let intersection = event.detail.intersection.point;
    let x = intersection.x;
    let y = intersection.y;
    let z = intersection.z;
    let nextScene = document.getElementById("nextScene");
    let s = 8;
    // changes.current.push({
    //   type : 'new',
    //   id : lastId.current,
    //   x : x,
    //   y : y,
    //   z : z
    // })
    setcurrent((current) => ({
      ...current,
      scenePointer: [
        ...current.scenePointer,
        { x: x, y: y, z: z, s: s, nextScene: nextScene.value },
      ],
    }));
  };
  // let handleskyclick = (event) => {
  //               let intersection = event.detail.intersection.point;
  //               let x = intersection.x
  //               let y = intersection.y
  //               let z = intersection.z
  //               let nextScene = document.getElementById("nextScene");
  //               let s = 8
  //               changes.current = {
  //                 name : 'ok',
  //                 x : x,
  //                 y : y,
  //                 z : z,
  //                 s : s,
  //                 nextScene:nextScene.value,
  //               }
  //               fetch( `http://localhost:5000/api/v1/scenes/${current._id}/addPointer` , {
  //                 method : 'post',
  //                 headers: {
  //                   'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(changes.current)

  //               } ).then(() => window.location.reload())
  //             }

  let a = (event) => {
    handleskyclick(event);
    document
      .getElementById("cursor")
      .setAttribute("raycaster", "objects:a-box");
    document.querySelector("a-sky").removeEventListener("click", a);
    document.getElementById("add").removeAttribute("disabled");
  };

  let handleAdd = () => {
    document
      .getElementById("cursor")
      .setAttribute("raycaster", "objects:a-sky");
    document.querySelector("a-sky").addEventListener("click", a);
    if (show) setShow(false);
    else setShow(true)
  };

  let handleclick = (item) => {
    if (circle.current && circle.current != item._id) {
      document.getElementById(circle.current).setAttribute("color", "white");
    }
    if (document.getElementById(item._id).getAttribute("color") == "white") {
      document.getElementById(item._id).setAttribute("color", "red");
      circle.current = item._id;
      let inputs = Array.from(document.getElementsByClassName("change"));
      inputs[0].value = item.x;
      inputs[1].value = item.y;
      inputs[2].value = item.z;
      inputs[3].value = item.s;
    } else {
      let inputs = Array.from(document.getElementsByClassName("change"));
      inputs[0].value = 0;
      inputs[1].value = 0;
      inputs[2].value = 0;
      inputs[3].value = 0;
      document.getElementById(item._id).setAttribute("color", "white");
      circle.current = null;
    }
  };

  let resetCircle = () => (circle.current = null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/scenes")
      .then((result) => result.json())
      .then((result) => {
        console.log(result.data.Scenes[0].scenePointer);
        global.current = result.data.Scenes;
        setcurrent(global.current[0]);
      });
  }, []);

  return (
    <div className="admin2">
      <a-scene className="scenel" id="scenel">
        {current ? (
          <a-sky src={"http://localhost:5000/" + current.imageLink}></a-sky>
        ) : null}
        <a-camera ref={sceneref} position="0 0 0" look-controls="reverseMouseDrag: true"></a-camera>
        <a-entity
          cursor="fuse: false;rayOrigin:mouse;"
          raycaster="objects:a-sphere"
        ></a-entity>
        <a-entity
          id="cursor"
          cursor="fuse: false;rayOrigin:mouse;"
          raycaster="objects:a-box"
        ></a-entity>
        {current ? (
          <Spheres coords={current.scenePointer} handler={handleclick} />
        ) : null}
      </a-scene>
      <form name="data" id="data">
        <input
          className="change"
          type="text"
          placeholder="x"
          id="x"
          name="x"
          onChange={(e) => {
            if (circle.current) {
              let element = document.getElementById(circle.current);
              let pos = element.getAttribute("position");
              element.setAttribute("position", {
                x: parseFloat(e.target.value),
                y: pos.y,
                z: pos.z,
              });
              if (
                changes.current.findIndex(
                  (element) => element._id == circle.current
                ) != -1
              ) {
                changes.current[
                  changes.current.findIndex(
                    (element) => element._id == circle.current
                  )
                ].x = e.target.value;
              } else
                changes.current.push({
                  type: "update",
                  id: circle.current,
                  x: e.target.value,
                  y: "unchanged",
                  z: "unchanged",
                });
              console.log(changes.current);
            }
          }}
        ></input>
        <input
          className="change"
          type="text"
          placeholder="y"
          id="y"
          name="y"
          onChange={(e) => {
            if (circle.current) {
              let element = document.getElementById(circle.current);
              let pos = element.getAttribute("position");
              element.setAttribute("position", {
                x: pos.x,
                y: parseFloat(e.target.value),
                z: pos.z,
              });
              if (
                changes.current.findIndex(
                  (element) => element._id == circle.current
                ) != -1
              ) {
                changes.current[
                  changes.current.findIndex(
                    (element) => element._id == circle.current
                  )
                ].y = e.target.value;
              } else
                changes.current.push({
                  type: "update",
                  id: circle.current,
                  x: "unchanged",
                  y: e.target.value,
                  z: "unchanged",
                });
              console.log(changes.current);
            }
          }}
        ></input>
        <input
          className="change"
          type="text"
          placeholder="z"
          id="z"
          name="z"
          onChange={(e) => {
            if (circle.current) {
              let element = document.getElementById(circle.current);
              let pos = element.getAttribute("position");
              element.setAttribute("position", {
                x: pos.x,
                y: pos.y,
                z: parseFloat(e.target.value),
              });
              if (
                changes.current.findIndex(
                  (element) => element._id == circle.current
                ) != -1
              ) {
                changes.current[
                  changes.current.findIndex(
                    (element) => element._id == circle.current
                  )
                ].z = e.target.value;
              } else
                changes.current.push({
                  type: "update",
                  id: circle.current,
                  x: "unchanged",
                  y: "unchanged",
                  z: e.target.value,
                });
              console.log(changes.current);
            }
          }}
        ></input>
        <input
          className="change"
          type="text"
          placeholder="s"
          id="s"
          name="s"
          onChange={(e) => {
            if (circle.current) {
              let element = document
                .getElementById(circle.current)
                .setAttribute("radius", e.target.value);
            }
          }}
        ></input>
        <input
          type="text"
          id="nextScene"
          name="nextScene"
          placeholder="Next Scene id"
        ></input>
        <input
          type="button"
          value="add a button"
          id="add"
          name="add"
          className="add"
          onClick={handleAdd}
        ></input>
        <input
          type="button"
          value="delete button"
          id="delete"
          name="delete"
          className="delete"
          onClick={() => {
            setcurrent((current) => ({
              ...current,
              scenePointer: current.scenePointer.filter((element) => {
                if (circle.current == element._id) {
                  circle.current = null;
                  return false;
                }
                return element._id != circle.current;
              }),
            }));
          }}
        ></input>
        <input
          type="submit"
          value="submit changes"
          id="val"
          className="val"
          name="val"
          onClick={(e) => {
            e.preventDefault();
            console.log(JSON.stringify(current));
            fetch(`http://localhost:5000/api/v1/scenes/${current._id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(current),
            })
              .then((response) => response.json())
              .then((data) => console.log(data))
              .catch((error) => console.error("Error:", error));
          }}
        ></input>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => {
            console.log(e.target.value);
            if (circle.current) {
              if (
                changes.current.findIndex(
                  (element) => element._id == circle.current
                ) != -1
              ) {
                changes.current[
                  changes.current.findIndex(
                    (element) => element._id == circle.current
                  )
                ].image = e.target.value;
              } else
                changes.current.push({
                  type: "update",
                  id: circle.current,
                  x: "unchanged",
                  y: "unchanged",
                  z: e.target.value,
                  image: e.target.value,
                });
              console.log(changes.current);
            }
          }}
        ></input>
        <p id="or">or</p>
        <input type="button" id="choose" value="choose an existing scene">
          {/*link to models page*/}
        </input>
      </form>
      <Scenes setcurrent={setcurrent} resetCircle={resetCircle} />
      {show ? <Selection /> : null }
    </div>
  );
}

export default Model;
