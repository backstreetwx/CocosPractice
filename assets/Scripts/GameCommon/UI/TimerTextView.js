var GameTimer = require("GameTimer");

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
    bindTimer: false,
    gameTimer: {
      default: null,
      type: GameTimer
    },
    timeLabel: {
      default: null,
      type: cc.Label
    }
  },

  // use this for initialization
  onLoad: function () {
    this.timeLabel = this.getComponent(cc.Label);
    this.timeLabel.string = "00 : 00";

    if (this.gameTimer === null) {
      var _node = cc.find("GameTimer");
      if (_node === null)
        throw "_node === null";

      this.gameTimer = _node.getComponent("GameTimer");
    }
  },

  onEnable: function () {
    if (this.bindTimer)
      this.gameTimer.node.on(GameTimer.TIME_CHANGED, this.setTimeEvent, this);
  },

  start: function () {

  },

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },

  onDisable: function () {
    if (this.bindTimer)
      this.gameTimer.node.off(GameTimer.TIME_CHANGED, this.setTimeEvent, this)
  },

  setTimeEvent: function (event) {
    this.setTime(event.detail.lastSeconds);
  },

  setTime: function (timeSeconds) {
    var _roundSeconds = Math.round(timeSeconds);

    var _mins = Math.trunc(_roundSeconds / 60);
    var _secs = _roundSeconds % 60;

    _mins = ("0" + _mins).slice(-2);
    _secs = ("0" + _secs).slice(-2);

    this.timeLabel.string = _mins + " : " + _secs;
  }
});
