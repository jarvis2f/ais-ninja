import {create} from 'zustand';

export interface pluginState {
  block: string,
  currentPluginId?: string | undefined,
  debug: boolean,
  updateBlock: (value: 'main' | 'detail' | 'edit') => void,
  updateCurrentPluginId: (value: string | undefined) => void,
  updateDebug: (value: boolean) => void,
}

export const pluginStore = create<pluginState>((set) => ({
  block: 'main',
  debug: false,
  updateBlock: (value: 'main' | 'detail' | 'edit') => set({block: value}),
  updateCurrentPluginId: (value: string | undefined) => set({currentPluginId: value}),
  updateDebug: (value: boolean) => set({debug: value}),
}));
