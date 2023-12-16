// The eslint-parser-plain missing `meta` info
// source code: https://github.com/so1ve/eslint-parser-plain/blob/main/src/index.ts

export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (code: string) => ({
    ast: {
      type: 'Program',
      loc: { start: 0, end: code.length },
      range: [0, code.length],
      body: [],
      comments: [],
      tokens: [],
    },
    services: { isPlain: true },
    scopeManager: null,
    visitorKeys: {
      Program: [],
    },
  }),
}
