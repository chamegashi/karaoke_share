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

export const useEditMusic = defineStore('editMusic', {
  state: () => ({
    music: {} as Music,
    isEdit: false as Boolean,
  }),
  actions: {
    updateEditMusic(data: Music) {
      this.music = data
    },
    updateisEdit(value: boolean) {
      this.isEdit = value
    }
  }
});