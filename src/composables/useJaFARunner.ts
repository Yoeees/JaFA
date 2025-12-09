// src/composables/useJafaRunner.ts
export interface CompileResult {
  output: string;
  assembly: string;
  machineCode: string;
  success: boolean;
  errors?: string;
}

export function useJafaRunner() {
  const runCompiler = async (code: string): Promise<CompileResult> => {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.errors || 'Compilation failed');
    }

    return {
      success: true,
      output: data.output || '',
      assembly: data.assembly || '(Assembly output not implemented yet)',
      machineCode: data.machineCode || '(Machine code not implemented yet)',
    };
  };

  return { runCompiler };
}
