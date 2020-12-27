'use strict';

const rule = require('.');
const { ruleName, messages } = rule;

testRule({
  ruleName,
  config: true,
  fix: false,
  accept: [
    {
      code: '@media (max-width: $screen-sm-max) {}',
    },
    {
      code: '@media (min-width: $screen-sm-min) and (max-width: $screen-sm-max) {}',
    },
    // {
    //   code: '@media (max-width: 600px) and (min-width: 3em) {}',
    // },
    // {
    //   code: '@custom-selector :--enter :hover;',
    // },
  ],

  // reject: [
  //   {
  //     code: '@media (max-width: $screen-sm-min) {}',
  //     fixed: '@media (max-width: 600px) {}',
  //     message: "aaa",
  //     line: 1,
  //     column: 18,
  //   },
  //   {
  //     code: '@mEdIa (max-width:600px) {}',
  //     fixed: '@mEdIa (max-width: 600px) {}',
  //     message: "aaa",
  //     line: 1,
  //     column: 18,
  //   },
  //   {
  //     code: '@media (max-width:600px) and (min-width: 3em) {}',
  //     fixed: '@media (max-width: 600px) and (min-width: 3em) {}',
  //     message: "aaa",
  //     line: 1,
  //     column: 18,
  //   },
  //   {
  //     code: '@media (max-width:600px) and (min-width:3em) {}',
  //     fixed: '@media (max-width: 600px) and (min-width: 3em) {}',
  //     warnings: [
  //       {
  //         message: "aaa",
  //         line: 1,
  //         column: 18,
  //       },
  //       {
  //         message: "aaa",
  //         line: 1,
  //         column: 40,
  //       },
  //     ],
  //   },
  // ],
});

// testRule({
//   ruleName,
//   config: ['never'],
//   fix: true,
// 
//   accept: [
//     {
//       code: '@media (max-width:600px) {}',
//     },
//     {
//       code: '@media (max-width:600px) and (min-width:3em) {}',
//     },
//     {
//       code: '@custom-selector : --enter :hover;',
//     },
//   ],
// 
//   reject: [
//     {
//       code: '@media (max-width: 600px) {}',
//       fixed: '@media (max-width:600px) {}',
//       message: "bbb",
//       line: 1,
//       column: 18,
//     },
//     {
//       code: '@mEdIa (max-width: 600px) {}',
//       fixed: '@mEdIa (max-width:600px) {}',
//       message: "bbb",
//       line: 1,
//       column: 18,
//     },
//     {
//       code: '@media (max-width:600px) and (min-width: 3em) {}',
//       fixed: '@media (max-width:600px) and (min-width:3em) {}',
//       message: "bbb",
//       line: 1,
//       column: 40,
//     },
//     {
//       code: '@media (max-width: 600px) and (min-width: 3em) {}',
//       fixed: '@media (max-width:600px) and (min-width:3em) {}',
//       warnings: [
//         {
//           message: "bbb",
//           line: 1,
//           column: 18,
//         },
//         {
//           message: "bbb",
//           line: 1,
//           column: 41,
//         },
//       ],
//     },
//   ],
// });
