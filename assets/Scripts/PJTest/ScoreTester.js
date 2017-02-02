var ScoreManager = require("ScoreManager");//require("../GameCommon/ScoreManager.js");

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
    ButtonLabel: {
      default: null,
      type: cc.Label,
    },

    addCount: 1,
  },

  // use this for initialization
  onLoad: function () {
    this.ButtonLabel.string = "+" + this.addCount;
  },

  OnClick: function () {
    ScoreManager.Instance.addScore(this.addCount);
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
