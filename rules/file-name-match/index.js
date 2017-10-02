"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const _ = require("lodash");
const utils = require('../../utils');

const ruleName = utils.namespace('file-name-match');

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
      if (rule.parent.selector) {
        return;
      }

      const inputFrom = rule.source.input.from;
      const inputFromFileName = inputFrom.split('/').pop();

      let selectorName = rule.selector;
      const selectorPrefixName = rule.selector.match(/^(.*?-).*?/);

      if (!selectorPrefixName) {
        return;
      }

      if (selectorPrefixName) {
        selectorName = selectorPrefixName[1];
      }

      const rawSelectorName = selectorName.replace('.', '').replace('-', '');

      // Check if the "optionSelectorAndFileNameMap" has the key selector.
      if (rawSelectorName in optionSelectorAndFileNameMap) {
        
        console.log(inputFromFileName + ' != ' + optionSelectorAndFileNameMap[rawSelectorName]);
        
        if (inputFromFileName != optionSelectorAndFileNameMap[rawSelectorName]) {
          return report({
            result,
            ruleName,
            node: rule,
            message: messages.rejected(rule.selector, optionSelectorAndFileNameMap[rawSelectorName]),
          })
        }
      }
    })
  }
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
