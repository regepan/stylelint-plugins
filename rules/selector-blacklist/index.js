"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const _ = require("lodash");
const utils = require('../../utils');

const ruleName = utils.namespace('selector-blacklist');

const messages = ruleMessages(ruleName, {
  rejected: (selector) => `"${selector}" is not allowed class name.`
});

const rule = function (actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: actual.blacklist,
      possible: _.isArray
    });

    if (!validOptions) {
      return
    }

    root.walkRules(rule => {
      if (actual.blacklist.indexOf(rule.selector) >= 0) {
        return report({
          result,
          ruleName,
          node: rule,
          message: messages.rejected(rule.selector),
        })
      }

    })
  }
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
