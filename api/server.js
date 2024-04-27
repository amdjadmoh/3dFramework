let express = require("express");
let server = new express();
let cors = require("cors");
let path = require("path");

let models = [
  {
    id: 0,
    title: "model1",
    description: "some text",
    principal_image: "entrance2.jpg",
    coords: [
      {
        id: 1,
        x: -301.71219582557956,
        y: -5.262151432522041,
        z: -397.66781505486074,
        s: 7,
        idtogo: "1",
        info: "",
        video: "",
      },
      {
        id: 2,
        x: -14.95344470762598,
        y: -48.14540267757086,
        z: -496.9001618160549,
        s: 7,
        idtogo: "2",
        info: "",
        video: "",
      },
    ],
  },
  {
    id: 1,
    title: "model2",
    description: "some text",
    principal_image: "entrance.jpg",
    coords: [
      {
        id: 3,
        x: 390.71595779557657,
        y: -102.3899705564617,
        z: -293.3759428993887,
        s: 7,
        idtogo: "0",
        info: "",
        video: "",
      },
      {
        id: 4,
        x: -378.1403967847667,
        y: 150.14705591074866,
        z: -289.3742673653805,
        s: 7,
        idtogo: "2",
        info: "",
        video: "",
      },
    ],
  },
  {
    id: 2,
    title: "model3",
    description: "some text",
    principal_image: "d.jpg",
    coords: [
      {
        id: 5,
        x: -129.1516067967279,
        y: 219.02321103549414,
        z: -429.80621670449534,
        s: 7,
        idtogo: "0",
        info: "",
        video: "",
      },
      {
        id: 6,
        x: -219.40705551887262,
        y: -223.9173931882367,
        z: -388.4643308039381,
        s: 7,
        idtogo: "1",
        info: "",
        video: "",
      },
    ],
  },
];

server.use(cors());

server.use(express.static(path.join(__dirname, "pictures")));
server.use(express.static(path.join(__dirname, "build")));

server.get("/models", (req, res) => {
  res.json(models);
});

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(5000, () => {
  console.log("listening at 5000");
});
