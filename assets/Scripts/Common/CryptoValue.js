var crypto = require('crypto');

var CryptoValue = cc.Class({
  ctor: function () {
    this.algorithm = 'aes-256-ctr';
    this.password = crypto.randomBytes(32);
    this.key = this.password.readInt32BE(0, password.length);
    cc.log("key = " + this.key);
  },

  encryptInt: function (value) {
    return value ^ this.key;
  },

  decryptInt: function (value) {
    return value ^ this.key;
  },

  encryptFloat: function (value) {
    return this.encryptText(value.toString());

    //this way will generate _floatDecimal with minus sign
    /* 
    var _strFull = String(value).split(".");
    var _floatInt = Number(_strFull[0]) ^ key;
    var _floatDecimal = Number(_strFull[1]) ^ key;
    cc.log("==========  encryptFloat ============");
    cc.log("value = " + value);
    cc.log("_strFull[0] = " + Number(_strFull[0]));
    cc.log("_strFull[1] = " + Number(_strFull[1]));
    cc.log("_strFull = " + _strFull);
    cc.log("_floatInt = " + _floatInt);
    cc.log("_floatDecimal = " + _floatDecimal);
    cc.log("==========  end ============");
    return [_floatInt, _floatDecimal];
    */
  },

  decryptFloat: function (value) {
    return parseFloat(this.decryptText(value));
    /*
    var _floatInt = value[0] ^ key;
    var _floatDecimal = value[1] ^ key;
    var _floatFull = parseFloat(String(_floatInt) + "." + String(_floatDecimal));
    cc.log("==========  decryptFloat ============");
    cc.log("value[0] = " + value[0]);
    cc.log("value[1] = " + value[1]);
    cc.log("_floatInt = " + _floatInt);
    cc.log("_floatDecimal = " + _floatDecimal);
    cc.log("_floatFull = " + _floatFull);
    cc.log("==========  end ============");
    return _floatFull;
    */
  },


  encryptText: function (value) {
    var cipher = crypto.createCipher(this.algorithm, this.password);
    var crypted = cipher.update(value, 'utf8', 'hex');
    crypted += cipher.final('hex');
    //cc.log("crypted = " + crypted);
    return crypted;
  },

  decryptText: function (value) {
    var decipher = crypto.createDecipher(this.algorithm, this.password);
    var dec = decipher.update(value, 'hex', 'utf8');
    dec += decipher.final('utf8');
    //cc.log("dec = " + dec);
    return dec;
  },

})

module.exports.Instance = new CryptoValue();
