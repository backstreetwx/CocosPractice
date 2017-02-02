var ScoreManager = require("ScoreManager");
var ScoreType = cc.Enum({
  HIGH_SCORE: 0,
  SCORE: 1
})

cc.Class({
  extends: cc.Component,

  properties: {
    scoreType: {
      default: ScoreType.HIGH_SCORE,
      type: ScoreType,
    },
  },

  // use this for initialization
  onLoad: function () {
    this.scoreLabel = this.getComponent(cc.Label);
    
    switch (this.scoreType) {
      case ScoreType.HIGH_SCORE:
        this.scoreLabel.string = ScoreManager.Instance.historyHighScore;
        //Passing arguments and this to listeners : 
        //https://nodejs.org/api/events.html#events_passing_arguments_and_this_to_listeners
        ScoreManager.Instance.eventEmitter.on(ScoreManager.EVENT_NAMES.HIGH_SCORE_CHANGED, (score)=>{
          this.updateScore(score);
        });
        break;
      case ScoreType.SCORE:
        this.scoreLabel.string = ScoreManager.Instance.currentScore;
        ScoreManager.Instance.eventEmitter.on(ScoreManager.EVENT_NAMES.SCORE_CHANGED, (score)=>{
          this.updateScore(score);
        });
        break;
    }
  },

  updateScore: function (score) {
    this.scoreLabel.string = String(score);
    cc.log(this.scoreLabel.string);
  },
});
