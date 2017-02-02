const EventEmitter = require('events');
var CryptoValue = require("CryptoValue");

var ScoreManager = cc.Class(
  {
    ctor: function () {
      this._currentScore = CryptoValue.Instance.encryptInt(0);
      this._historyHighScore = CryptoValue.Instance.encryptInt(0);
      this.eventEmitter = new EventEmitter();
    },

    properties: {
      currentScore: {
        get: function () {
          cc.log("encrypted this._currentScore = " + this._currentScore);
          return CryptoValue.Instance.decryptInt(this._currentScore);
        },
        set: function (value) {
          this._currentScore = CryptoValue.Instance.encryptInt(value);
          //event
          this.eventEmitter.emit(_EVENT_NAMES.SCORE_CHANGED, this.currentScore);
        }
      },

      historyHighScore: {
        get: function () {
          cc.log("encrypted this._historyHighScore = " + this._historyHighScore);
          return CryptoValue.Instance.decryptInt(this._historyHighScore);
        },
        set: function (value) {
          this._historyHighScore = CryptoValue.Instance.encryptInt(value);
          //event
          this.eventEmitter.emit(_EVENT_NAMES.HIGH_SCORE_CHANGED, this.historyHighScore);
        }
      },
    },

    loadHistoryHighScore: function () {
      var _highScore = cc.sys.localStorage.getItem(_KEY_HIGH_SCORE);
      if (_highScore === "undefined")
        _highScore = null;

      if (_highScore === null)
        _highScore = 0;
      else
        _highScore = Number(_highScore);

      this.historyHighScore = _highScore;
    },

    addScore: function (score) {
      this.currentScore += score;
    },

    clearScore: function () {
      this.currentScore = 0;
    },

    save: function () {
      if (this.currentScore <= this.historyHighScore)
        return;

      cc.sys.localStorage.setItem(_KEY_HIGH_SCORE, this.currentScore);
      this.historyHighScore = this.currentScore;
    },
  });

var _KEY_HIGH_SCORE = "HIGH_SCORE";
var _EVENT_NAMES = new cc.Class({
  statics: {
    HIGH_SCORE_CHANGED: "HIGH_SCORE_CHANGED",
    SCORE_CHANGED: "SCORE_CHANGED",
  },
});

var _scoreManager = new ScoreManager();
// Maybe do this here is not good!
_scoreManager.loadHistoryHighScore();

module.exports.Instance = _scoreManager;
module.exports.EVENT_NAMES = _EVENT_NAMES;
