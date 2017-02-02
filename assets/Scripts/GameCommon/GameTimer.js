const EventEmitter = require('events');
var CryptoValue = require("CryptoValue");

var GameTimer = cc.Class({
  extends: cc.Component,
  /*
    ctor: function () {
      this.eventEmitter = new EventEmitter();
    },*/

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
    /*
    eventEmitter: {
      default: null,
      type: EventEmitter,
    },*/
    timerIsRunning: false,
    _timeSeconds: CryptoValue.Instance.encryptFloat(0.0),
    timeSeconds: {
      get: function () {
        return CryptoValue.Instance.decryptFloat(this._timeSeconds);
      },

      set: function (value) {
        this._timeSeconds = CryptoValue.Instance.encryptFloat(value);
        this.node.emit(GameTimer.TIME_CHANGED, {
          lastSeconds: this.timeSeconds
        });
        //this.eventEmitter.emit(GameTimer.TIME_CHANGED, this._timeSeconds);
      }
    },
  },

  statics: {
    TIME_CHANGED: "TIME_CHANGED",
  },

  // use this for initialization
  onLoad: function () {
    //this.eventEmitter = new EventEmitter();
    cc.log(this._timeSeconds);
    //this._timeSeconds = [CryptoValue.Instance.encrypt(0),CryptoValue.Instance.encrypt(0)];
  },

  start: function () {
    this.activeTimer(10);
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dtSeconds) {
    if (this.timerIsRunning) {
      var _timeSeconds = this.timeSeconds;
      _timeSeconds -= dtSeconds
      if (_timeSeconds <= 0.0)
        this.clear();
      else
        this.timeSeconds = _timeSeconds;
    }
  },

  activeTimer: function (intervalSeconds) {
    this.timeSeconds = intervalSeconds;
    this.timerIsRunning = true;
  },

  clear: function () {
    this.timeSeconds = 0.0;
    this.timerIsRunning = false;
  }
});

module.exports = GameTimer;
