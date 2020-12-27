"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const _ = require("lodash");
const utils = require('../../utils');

const ruleName = utils.namespace('media-query-variables');

const messages = ruleMessages(ruleName, {
  rejected: (params) => `${params} 'min' & 'max' is not match.`
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
      actual: actual,
      possible: _.isBoolean
    });

    if (!validOptions) {
      return
    }

    root.walkAtRules(/^media$/i, (atRule) => {
      const params = atRule.raws.params ? atRule.raws.params.raw : atRule.params;
      const countMin = (params.match(/min/g) || []).length;
      const countMax = (params.match(/max/g) || []).length;

      if (params.indexOf("px") > -1) {
        return;
      }

      if (params.indexOf("min-width") > -1 && params.indexOf("$grid-float-breakpoint") > -1) {
        if (params.indexOf("-max") === -1) {
          return;
        }
      }

      if ((countMin % 2 === 1) || (countMax % 2 === 1)) {
        console.log(countMin, countMax);
        report({
          message: messages.rejected(params),
          node: atRule,
          result,
          ruleName,
        });
      }
    });
  }
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
