"use strict"

const findAtRuleContext = require("../../utils/findAtRuleContext")
const nodeContextLookup = require("../../utils/nodeContextLookup")
const report = require("../../utils/report")
const ruleMessages = require("../../utils/ruleMessages")
const validateOptions = require("../../utils/validateOptions")
const _ = require("lodash")
const normalizeSelector = require("normalize-selector")
const resolvedNestedSelector = require("postcss-resolve-nested-selector")
const utils = require('../../utils')

const ruleName = utils.namespace('file-name-match')

const messages = ruleMessages(ruleName, {
  rejected: (selector, firstDuplicateLine) => `Error!!!`,
})

const rule = function (actual) {
  const optionIgnoreIndexOfMatch = [].concat(actual.ignoreIndexOfMatch)
  const optionIgnoreStrictEquality = [].concat(actual.ignoreStrictEquality)

  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: optionIgnoreIndexOfMatch,
      possible: [_.isString]
    })

    if (!validOptions) {
      return
    }

    // The top level of this map will be rule sources.
    // Each source maps to another map, which maps rule parents to a set of selectors.
    // This ensures that selectors are only checked against selectors
    // from other rules that share the same parent and the same source.
    const selectorContextLookup = nodeContextLookup()

    root.walkRules(rule => {
      const contextSelectorSet = selectorContextLookup.getContext(rule, findAtRuleContext(rule))
      const resolvedSelectors = rule.selectors.reduce((result, selector) => {
        return _.union(result, resolvedNestedSelector(selector, rule))
      }, [])
      // const normalizedSelectorList = resolvedSelectors.map(normalizeSelector)
      // const selectorLine = rule.source.start.line

    const ruleSourceInputFrom = rule.source.input.from
    const ruleSourceInputFromFileName = ruleSourceInputFrom.split('/').pop()
    const selectorAndFileNameMap = {
      'hr': 'scaffolding',
      'btn': 'btn',
      'breadcrumb': 'breadcrumb'
    }
    const selectorName = rule.selector.replace(/^\./, '')

    if (selectorName in selectorAndFileNameMap) {
      if (ruleSourceInputFromFileName.indexOf(selectorAndFileNameMap[selectorName]) > -1) {
        return true;
      }
    }

    if (true) {
      console.error('  error:', 'file name match error...')
      process.exit(1)
    }

    if (contextSelectorSet.has(sortedSelectorList)) {
      return report({
        result,
        ruleName,
        node: rule,
        message: messages.rejected(selectorForMessage, previousDuplicatePosition),
      })
    }
  })
  }
}

rule.ruleName = ruleName
rule.messages = messages
module.exports = rule
