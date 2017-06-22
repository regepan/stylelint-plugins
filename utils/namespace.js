const prefix = 'stylelint-plugins';

module.exports = function namespace(ruleName) {
	return `${prefix}/${ruleName}`;
};
