var GameTimer = require("GameTimer");
var ScoreManager = require("ScoreManager");

cc.Class({
  extends: cc.Component,

  properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    gameTimer: {
      default: null,
      type: GameTimer
    },

    overUI: {
      default: null,
      type: cc.Prefab
    },

    state: null,
  },

  // use this for initialization
  onLoad: function () {
    if (this.gameTimer === null) {
      var _node = cc.find("GameTimer");
      if (_node === null)
        throw "_node === null";
      this.gameTimer = _node.getComponent("GameTimer");
    }
    this.state = "listen";

  },

  listenGameTimer: function(){
    if(!this.gameTimer.timerIsRunning){
      this.state = "listenOff";
      ScoreManager.Instance.save();
      var newNode = cc.instantiate(this.overUI);
      cc.director.getScene().addChild(newNode);
    }
  },
  
  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    switch(this.state){
      case "listen":
        this.listenGameTimer();
        break;
      case "listenOff":
        cc.log('--listener off--');
        break;
    }
  },
  
});
