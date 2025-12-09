const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

app.post('/api/run', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ success: false, errors: 'No code provided' });

  const compilerPath = path.join(__dirname, 'backend', 'jafa');
  const compiler = spawn(compilerPath);

  let fullOutput = '';

  compiler.stdout.on('data', data => fullOutput += data.toString());
  compiler.stderr.on('data', data => fullOutput += data.toString());

  compiler.on('close', exitCode => {
    // Split the output into three clean sections
    const lines = fullOutput.split('\n');
    let output = '';
    let assembly = '';
    let machineCode = '';
    let currentSection = 'output';

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('Assembly code:')) {
        currentSection = 'assembly';
        continue;
      }
      if (trimmed.startsWith('Machine code:')) {
        currentSection = 'machineCode';
        continue;
      }

      if (currentSection === 'output') output += line + '\n';
      else if (currentSection === 'assembly') assembly += line + '\n';
      else if (currentSection === 'machineCode') machineCode += line + '\n';
    }

    res.json({
      success: exitCode === 0,
      output: output.trim(),
      assembly: assembly.trim(),
      machineCode: machineCode.trim(),
      errors: exitCode !== 0 ? fullOutput.trim() : '',
    });
  });

  compiler.stdin.write(code);
  compiler.stdin.end();
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`JaFA IDE running at http://localhost:${PORT}`);
});
