import { defineStore } from 'pinia';
import { ShowData } from '../common/type'

export const useShareMusics = defineStore('musics', {
  state: () => ({
    musics: [] as ShowData[],
  }),
  actions: {
    updateMusic(data: ShowData[]) {
      this.musics = data
    }
  }
});