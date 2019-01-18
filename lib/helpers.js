/*
 *  Helpers for various tasks.
 *
 */

//  Dependencies
var crypto = require('crypto');

//  Container for all the helpers.
var helpers = {};

//  Create SHA256 hash.
helpers.hash = function(str) {
  if (typeof(str) == 'string' && str.length > 0) {
    var hash = crypto.createHmac('sha256', 'thisIsAHashingSecret').update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

//  Parse a JSON string to an object in al cases, without throwing.
helpers.parseJsonToObject = function(str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

//  Create a string of random alphanumeric characters, of a given length.
helpers.createRandomString = function(strLength) {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    //  Define al possible characters that could go into a string.
    var possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    //  Start the final string.
    var str = '';
    for (i = 1; i <= strLength; i++) {
      //  Get a random character from the possibleCharacters.
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string.
      str += randomCharacter;
    }

    //  Return the final string.
    return str;

  } else {
    return false;
  }
};
//  Export module.
module.exports = helpers;
