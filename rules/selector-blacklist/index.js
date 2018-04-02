"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const _ = require("lodash");
const utils = require('../../utils');
const path = require('path');

const ruleName = utils.namespace('selector-blacklist');

const messages = ruleMessages(ruleName, {
  rejected: (selector, fileName) => `Move "${selector}" to "${fileName}"`
});

const rule = function (actual) {
  const optionSelectorAndFileNameMap = actual.selectorAndFileNameMap;

  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: optionSelectorAndFileNameMap,
      possible: [_.isObject]
    });

    if (!validOptions) {
      return
    }

    root.walkRules(rule => {
      if (rule.parent.type !== 'root') {
        return;
      }
      
      const pathObject = path.parse(rule.source.input.from);
      const inputFromFileName = pathObject['base'];
      let keySelector = null;

      let selectorName = rule.selector;
      const selectorPrefix = rule.selector.match(/^(.*?-).*?/);

      if (Array.isArray(selectorPrefix)) {
        selectorName = selectorPrefix[1];
        keySelector = selectorName.replace('-', '');
      } else {
        keySelector = selectorName;
      }

      if (keySelector in optionSelectorAndFileNameMap) {
        if (inputFromFileName !== optionSelectorAndFileNameMap[keySelector]) {
          return report({
            result,
            ruleName,
            node: rule,
            message: messages.rejected(rule.selector, optionSelectorAndFileNameMap[keySelector]),
          })
        }
      }
    })
  }
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
