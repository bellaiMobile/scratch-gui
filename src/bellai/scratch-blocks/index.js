export default (ScratchBlocks) => {

  ScratchBlocks.sayHello = function () {
    console.log('Hello from scratch-blocks customizing!');
  };

  global.ScratchBlocks = ScratchBlocks;
};
