//diy dialog
import coreBlocklyRenderSvgVertical from './core/blockly-render-svg-vertical';
import coreDialogDiv from './core/dialog-div';
import coreDialogs from './core/dialogs';
import coreAngleDialog from './core/field-angle-dialog';
import coreClockWiseDialog from './core/field-clockwise-dialog';
import coreColourDialog from './core/field-colour-dialog';
import coreDistanceDialog from './core/field-distance-dialog';
import coreImageDialog from './core/field-image-dialog';
import coreMoudleDialog from './core/field-module-dialog';
import coreNumberDialog from './core/field-number-dialog';
import coreSpeedDialog from './core/field-speed-dialog';
//diy blockly
import blocksBellDetect from './blocks/bell-detect';
import blocksBellEvent from './blocks/bell-event';
import blocksBellMotion from './blocks/bell-motion';
import blocksbellSoundLight from './blocks/bell-sound-light';
//blocks tree
import blocksDefaultToolBox from './blocks/default-toolbox';

export default (Blockly) => {

  Blockly.sayHello = function () {
    console.log('Hello from scratch-blocks customizing!');
  };
  // 自定义弹框
  coreBlocklyRenderSvgVertical(Blockly);
  coreDialogDiv(Blockly);
  coreDialogs(Blockly);
  coreAngleDialog(Blockly);
  coreClockWiseDialog(Blockly);
  coreColourDialog(Blockly);
  coreDistanceDialog(Blockly);
  coreImageDialog(Blockly);
  coreMoudleDialog(Blockly);
  coreNumberDialog(Blockly);
  coreSpeedDialog(Blockly);
  //Mabot 语句块
  blocksBellDetect(Blockly);
  blocksBellEvent(Blockly);
  blocksBellMotion(Blockly);
  blocksbellSoundLight(Blockly);

  //blocks tree
  blocksDefaultToolBox(Blockly);

  global.ScratchBlocks = Blockly;
};
