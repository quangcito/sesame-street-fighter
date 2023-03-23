import Phaser from 'phaser'
import CharacterSelectScene from './scenes/CharacterSelectScene';
import MainMenuScene from './scenes/MainMenuScene';
import MapSelectScene from './scenes/MapSelectScene';
import PauseScene from './scenes/PauseScene';
import PlayScene from './scenes/PlayScene';
import PreloadScene from './scenes/PreloadScene';
import ResultsScene from './scenes/ResultsScene';
import ResumeScene from './scenes/ResumeScene';

const WIDTH = 1050;
const HEIGHT = 750; 

const SHARED_CONFIG ={
  width: WIDTH,
  height: HEIGHT
}

// const Scenes= [PreloadScene,MainMenuScene,CharacterSelectScene,MapSelectScene,PlayScene,PauseScene,ResumeScene,ResultsScene]
const Scenes = [PreloadScene, PlayScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG)  

const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  backgroundColor:'#ADD8E6',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 900},
      debug: true,
    },
  },
  scene: initScenes()
};

new Phaser.Game(config);
