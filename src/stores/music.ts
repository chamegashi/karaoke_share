import { defineStore } from 'pinia';
import { Music } from '../common/type'

export const useShareMusics = defineStore('musics', {
  state: () => ({
    musics: [] as Music[],
  }),
  actions: {
    updateMusic(data: Music[]) {
      this.musics = data
    }
  }
});