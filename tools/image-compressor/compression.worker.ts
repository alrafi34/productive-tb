import { compress, type EngineJob, type EngineResult } from "./engine";

export type WorkerRequest = { id: string; version: number; job: EngineJob };

export type WorkerResponse =
  | { id: string; version: number; result: EngineResult }
  | { id: string; version: number; error: string };

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { id, version, job } = e.data;
  try {
    const result = await compress(job);
    self.postMessage({ id, version, result } satisfies WorkerResponse);
  } catch (error) {
    self.postMessage({
      id,
      version,
      error: error instanceof Error ? error.message : "Compression failed",
    } satisfies WorkerResponse);
  }
};
