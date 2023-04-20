import Phaser from "phaser";
import CharacterSelectScene from "./scenes/CharacterSelectScene";
import MainMenuScene from "./scenes/MainMenuScene";
import MapSelectScene from "./scenes/MapSelectScene";
import PauseScene from "./scenes/PauseScene";
import PlayScene from "./scenes/PlayScene";
import PreloadScene from "./scenes/PreloadScene";
import ResultsScene from "./scenes/ResultsScene";
import ResumeScene from "./scenes/ResumeScene";
import EndScene from "./scenes/EndScene";

const WIDTH = 960;
const HEIGHT = 540;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
};

const Scenes = [
  PreloadScene,
  MainMenuScene,
  CharacterSelectScene,
  MapSelectScene,
  PlayScene,
  PauseScene,
  ResumeScene,
  ResultsScene,
  EndScene,
];

const createScene = (Scene) => new Scene(SHARED_CONFIG);

const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  autoCenter: true,
  backgroundColor: "#ADD8E6",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 2100 },
    },
  },
  scene: initScenes(),
};

new Phaser.Game(config);
