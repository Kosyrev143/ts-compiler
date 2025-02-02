// eslint-disable-next-line @typescript-eslint/no-require-imports
const ts = require('typescript');
const diagnostics_channel = require('node:diagnostics_channel');

const formatHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

async function watchMain() {
  const configPath = ts.findConfigFile(
    './',
    ts.sys.fileExists,
    'tsconfig.json',
  );

  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    ts.createEmitAndSemanticDiagnosticBuilderProgram,
    (diagnostics) =>
      console.log(
        ts.formatDiagnosticsWithColorAndContext([diagnostic], formatHost),
      ),
    (diagnostics) =>
      console.log(
        'Watch Status: ',
        ts.formatDiagnosticsWithColorAndContext([diagnostic], formatHost),
      ),
  );
  ts.createWatchProgram(host);
}
watchMain();
