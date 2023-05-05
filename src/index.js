import Phaser from 'phaser'
import CharacterSelectScene from './scenes/CharacterSelectScene';
import MainMenuScene from './scenes/MainMenuScene';
import MapSelectScene from './scenes/MapSelectScene';
import PlayScene from './scenes/PlayScene';
import PreloadScene from './scenes/PreloadScene';
import ResultsScene from './scenes/ResultsScene';
import EndScene from './scenes/EndScene';
import InstructionsScene from './scenes/InstructionsScene';

const WIDTH = 1024;
const HEIGHT = 576;

const SHARED_CONFIG ={
  width: WIDTH,
  height: HEIGHT
}

const Scenes= [PreloadScene,MainMenuScene,CharacterSelectScene,MapSelectScene,PlayScene,ResultsScene,EndScene,InstructionsScene]

const createScene = (Scene) => new Scene(SHARED_CONFIG)

const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  autoCenter:true,
  backgroundColor:'#ADD8E6',
  physics: {
    default: 'arcade',
    arcade: {
      debug:false,
      gravity: { y: 2700 }
    },
  },
  scene: initScenes()
};

new Phaser.Game(config);
