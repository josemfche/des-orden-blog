import { create } from 'zustand';

export const usePostStore = create((set) => ({
  globalPosts: [],
  updatePosts: (posts) => {
    console.log(posts, 'INSEDE');
    return set(() => ({ globalPosts: posts }));
  },
}));
