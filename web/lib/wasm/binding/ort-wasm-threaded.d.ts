// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {OrtWasmModule} from './ort-wasm.d.ts';

export interface OrtWasmThreadedModule extends OrtWasmModule {
  PThread?: {terminateAllThreads(): void};
}

declare const moduleFactory: EmscriptenModuleFactory<OrtWasmThreadedModule>;
export default moduleFactory;
