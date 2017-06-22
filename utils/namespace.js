const prefix = 'stylelint-no-duplicate-selector';

module.exports = function namespace(ruleName) {
	return `${prefix}/${ruleName}`;
};
