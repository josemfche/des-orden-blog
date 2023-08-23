import { create } from 'zustand';

export const usePostStore = create((set) => ({
  globalPosts: [],
  scroolView: false,
  updatePosts: (posts) => set((state) => ({ globalPosts: posts, scrollView: !state.scrollView })),
}));
