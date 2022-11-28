module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'no-descending-specificity': null,
    'alpha-value-notation': 'number',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'selector-max-specificity': [
      '0,4,2',
      {
        ignoreSelectors: [':global', ':local', '#root', '#box'],
      },
    ],
  },
};
