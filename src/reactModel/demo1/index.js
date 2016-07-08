"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

  return require('common/myReflux/hoc')(require('./view'), require('./controller'));
});