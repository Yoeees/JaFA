interface CompileResult {
  output: string;
  assembly: string;
  machineCode: string;
}

export function useJafaRunner() {
  const runCompiler = async (code: string): Promise<CompileResult> => {
    try {
      const result = await window.api.invoke('run-compiler', { code });
      return {
        output: result.stdout || '',
        assembly: result.assembly || '',
        machineCode: result.machineCode || '',
      };
    } catch (error) {
      throw new Error(`Compilation failed: ${error.message}`);
    }
  };

  return {
    runCompiler,
  };
}
