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

const errorReport = function (result, ruleName, rule, message) {
  return report({
    result,
    ruleName,
    node: rule,
    message: message,
  })
};

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
      const blacklist = actual.blacklist;
      const selector = rule.selector.trim();

      for (var i = 0; i < blacklist.length; i++) {
        if (typeof blacklist[i] === "string") {
          if (blacklist[i] === selector) {
            return errorReport(result, ruleName, rule, messages.rejected(selector));
          }

        } else if (typeof blacklist[i] === "object") {
          for (const key in blacklist[i]) {
            if (key.indexOf(selector) >= 0) {
              return errorReport(result, ruleName, rule, blacklist[i][key]);
            }

          }
        }
      }

    })
  }
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
