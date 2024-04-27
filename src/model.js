import React, { useEffect, useRef, useState } from "react";
import "aframe"
import Spheres from "./spheres"
import * as THREE from 'three'


function Model() {
  function getScene(id, scenes) {

    return scenes.find((element) => element._id === id);
  }
  let global = useRef(null);
  let [current, setcurrent] = useState(null);
  let sceneref = useRef(null);

  useEffect(() => {

    fetch("http://localhost:5000/api/v1/scenes")
      .then((result) => result.json())
      .then((result) => {
        global.current = result.data.Scenes
        // global.current.forEach(element => {
        //   let asset = document.createElement('img');
        //   asset.setAttribute('id', element._id);
        //   asset.setAttribute('src', 'http://localhost:5000/' + element.imageLink);
        //   asset.setAttribute('crossorigin', 'anonymous');
        //   document.getElementById('assests').appendChild(asset);
        // });
        setcurrent(global.current[0])
      })
  }, [])

  const handleclick = (item) => {
    document.getElementById(item._id).removeAttribute("animation");
    document
      .getElementById(item._id)
      .setAttribute(
        "animation",
        `property: radius; from : 5; to: 0; dur: 400; easing: linear; loop: false`
      );
    sceneref.current.removeAttribute("animation");
    sceneref.current.setAttribute(
      "animation",
      `property: position; from : 0 0 0 ; to: ${item.x * 0.2} ${item.y * 0.2} ${
        item.z * 0.2
      }; dur: 1000; easing: linear; loop: false`
    );
    document.getElementById('sky').setAttribute('animation',
  'property: material.opacity; from: 1; to: 0.5; dur: 500; easing: linear; loop: false')
    setTimeout(() => {
      setcurrent(getScene(item.nextScene,global.current));
          document
            .getElementById("sky")
            .setAttribute(
              "animation",
              "property: material.opacity; from: 0.5; to: 1; dur: 500; easing: linear; loop: false"
            );
      sceneref.current.setAttribute(
        "animation",
        `property: position; from : ${item.x * -0.1} ${item.y * -0.1} ${
          item.z * -0.1
        }; to: 0 0 0; dur: 500; easing: linear; loop: false`
      );
    }, 510);
  };

  return (
    <>
      {current ? (
        <a-scene className="scenel">
          <a-sky
            id="sky"
            src={`http://localhost:5000/` + current.imageLink}
            material="opacity:0"
            animation="property: material.opacity; from: 0.5; to: 1; dur: 500; easing: linear; loop: false"
          ></a-sky>
          <a-camera
            id="camera"
            ref={sceneref}
            look-controls="reverseMouseDrag: true"
          ></a-camera>
          <a-entity
            cursor="fuse: false;rayOrigin:mouse;"
            raycaster="objects:a-sphere"
          ></a-entity>
          <Spheres coords={current.scenePointer} handler={handleclick} />
        </a-scene>
      ) : (
        "loading"
      )}
    </>
  );
  
}

export default Model;