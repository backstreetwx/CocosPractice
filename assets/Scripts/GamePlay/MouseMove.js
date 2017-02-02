var ScoreManager = require("ScoreManager");
var GameTimer = require("GameTimer");

cc.Class({
  extends: cc.Component,

  properties: {
        
    moveHeight: 0,
        
    moveDuration: 0,

    randomSpeed: 0,

    stretchDuration: 0,

    initScaleX: 0,

    initScaleY: 0,

    moveBackDuration: 0,

    delayTime: 0,

    score: 0,

    waitTimeMin: 0,

    waitTimeMax: 0,

    state: "initial",

    actionMove: null,

    actionMoveBack: null,

    initPositionX: 0,

    initPositionY: 0,

    addScore: 1,

    gameTimer: {
      default: null,
      type: GameTimer
    },
        
  },

  setState: function (target, state) {
    this.state = state;
  },

  initial: function () {
    this.node.stopAllActions();
    this.actionMove = null;
    this.actionMoveBack = null;
    this.delayTime = Math.random() * (this.waitTimeMax - this.waitTimeMin) + this.waitTimeMin;
    this.randomSpeed = Math.random() * (1 - 0.5) + 0.5;
    
    this.standByDelayAction = cc.delayTime(this.delayTime);
    this.moveUpAction = cc.moveBy(this.moveDuration * this.randomSpeed, cc.p(0, this.moveHeight));
    this.moveDownAction = cc.moveBy(this.moveDuration * this.randomSpeed, cc.p(0, -this.moveHeight));
    this.moveSequence();
  },

  moveSequence: function(){
    var _actionSequence = cc.sequence(
      this.standByDelayAction,
      this.moveUpAction,
      this.moveDownAction,
      this.initAction
    );
    this.node.runAction(_actionSequence);
    this.state = "move";
  },

  onTapMoveBack: function() {
    cc.log('-------onTapMoveBack start-------');
    this.node.stopAllActions();
    this.onTapMoveBackSequence();
  },

  onTapMoveBackSequence: function(){
    var _actionSequence = cc.sequence(
      this.stretchOutAction,
      this.scaleBackAction,
      this.moveBackAction,
      this.initAction
    );
    this.actionMoveBack = _actionSequence;
    this.node.runAction(_actionSequence);
  },

  gameOver: function() {
    this.node.stopAllActions();
    this.state = "over";
  },

  setTapControl: function () {
    this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
      cc.log('-------touched-------');
      if(this.state==="move"){
        this.state = "onTapMoveBack";
        cc.log('-------onTapMoveBack-------');
        ScoreManager.Instance.addScore(this.addScore);
        this.onTapMoveBack();
      }
    }, this);
  },

  // use this for initialization
  onLoad: function () {
    this.state = "initial";
    this.initPositionX = this.node.x;
    this.initPositionY = this.node.y;
    this.initScaleX = this.node.scaleX;
    this.initScaleY = this.node.scaleY;
    this.setTapControl();
    if (this.gameTimer === null) {
      var _node = cc.find("GameTimer");
      if (_node === null)
        throw "_node === null";
      this.gameTimer = _node.getComponent("GameTimer");
    }
    ScoreManager.Instance.clearScore();
    
    this.setMoveStateAction = cc.callFunc(this.setState, this, "move");
    this.initAction = cc.callFunc(function (target) { this.initial(); }, this);
    this.stretchOutAction = cc.scaleTo(this.stretchDuration, this.initScaleX * 1.3, this.initScaleY * 1.1);
    this.scaleBackAction = cc.scaleTo(this.stretchDuration, this.initScaleX, this.initScaleY);
    this.moveBackAction = cc.moveTo(this.moveBackDuration, cc.p(this.initPositionX, this.initPositionY));
    
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    switch (this.state){
      case "initial":
        this.initial();
        break;
      case "over":
        return;
    }
    
    if(!this.gameTimer.timerIsRunning){
      this.gameOver();
    }
  },

});
