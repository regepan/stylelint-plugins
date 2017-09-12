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
      const ruleSourceInputFrom = rule.source.input.from;
      const ruleSourceInputFromFileName = ruleSourceInputFrom.split('/').pop();
  
      let selectorName = rule.selector.replace(/^\./, '');
      const selectorPrefixName = selectorName.match(/^(.*?)\-.*?/);
  
      if (selectorPrefixName) {
        selectorName = selectorPrefixName[1];
      }
  
      // Check if the "optionSelectorAndFileNameMap" has the key selector.
      if (selectorName in optionSelectorAndFileNameMap) {
        if (ruleSourceInputFromFileName != optionSelectorAndFileNameMap[selectorName]) {
          return report({
            result,
            ruleName,
            node: rule,
            message: messages.rejected(rule.selector, optionSelectorAndFileNameMap[selectorName]),
          })
        }
      }
    })
  }
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
