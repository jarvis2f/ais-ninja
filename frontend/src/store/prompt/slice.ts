import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { PromptInfo } from '@/types';
import prompts_zh_CN from '@/assets/prompts-zh_CN.json';
import prompts_en_GB from '@/assets/prompts-en_GB.json';

export interface PromptState {
  // 本地角色
  localPrompt: Array<PromptInfo>;
  // 新增角色
  addPrompts: (list: Array<PromptInfo>) => void;
  // 清除所有角色
  clearPrompts: () => void;
  // 删除单个角色
  delPrompt: (info: PromptInfo) => void;
  // 编辑角色信息
  editPrompt: (oldKey: string, info: PromptInfo) => void;
}

const prompts = {
  zh_CN: prompts_zh_CN,
  en_GB: prompts_en_GB,
}

const promptStore = create<PromptState>()(

  persist(
    (set, get) => ({
      localPrompt: [...prompts_en_GB],
      addPrompts: (list) =>
        set((state: PromptState) => {
          const resultMap = new Map();
          state.localPrompt.forEach((item) => resultMap.set(item.key, item));
          list.forEach((item) => resultMap.set(item.key, item));
          return {
            localPrompt: [...Array.from(resultMap.values())],
          };
        }),
      clearPrompts: () => set({ localPrompt: [] }),
      editPrompt: (oldKey, info) =>
        set((state: PromptState) => {
          const newList = state.localPrompt.map((item) => {
            if (oldKey === item.key) {
              return {
                ...info,
              };
            }
            return {
              ...item,
            };
          });
          return {
            localPrompt: [...newList],
          };
        }),
      delPrompt: (info) =>
        set((state: PromptState) => {
          const newList = state.localPrompt.filter(
            (item) => item.key !== info.key && item.value !== info.value
          );
          return {
            localPrompt: [...newList],
          };
        }),
    }),
    {
      name: 'prompt_storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
    }
  )
);

export default promptStore;
