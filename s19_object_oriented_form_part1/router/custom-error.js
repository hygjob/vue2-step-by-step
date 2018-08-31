'use strict';

module.exports = function CustomError(name, message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = name;  
  this.message = message;
  
};

require('util').inherits(module.exports, Error);