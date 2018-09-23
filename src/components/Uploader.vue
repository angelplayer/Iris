<template>
    <div>
        <label @click="close()" class="demo-icon mr-auto mouse">
            <div class="icon-preview mr-0"><i class="la la la-times"></i></div>
        </label>
        <input v-model="newEpisode.number" placeholder="No" type="text mx-1" class="form-control mx-1">
        <input v-model="newEpisode.name" placeholder="Episdoe name..." type="text mx-1" class="form-control">
        <label class="demo-icon px-1 mx-1 mouse">
            <div @click="chooseFile()" class="icon-preview" :class="{'text-info':hasFile}" ><i class="la la-film"></i></div>
        </label>
        <p  class="form-control-static"></p>
        <label class="demo-icon ml-auto mouse">
            <div @click="upload()" class="icon-preview"><i class="la la la-plane"></i></div>
        </label>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { EpisodeData } from "@/services/hyouka-api";
import { CREATE_EPISODE } from "@/store/constant";
import { Prop } from "vue-property-decorator";

@Component
export default class Uploader extends Vue {
  newEpisode: EpisodeData = new EpisodeData({file: '',name: ''});

  @Prop() movieId: number;

  chooseFile(): void {
    this.newEpisode.file = "abc.mp4";
  }

  upload(): void {
    this.$store
      .dispatch(CREATE_EPISODE, {
        episode: this.newEpisode,
        movieId: this.movieId
      })
      .then(() => {
        this.newEpisode.init({});
      });
  }

  close(): void {
    this.newEpisode.init({});
    this.$emit("click");
  }

  get hasFile() {
    return this.newEpisode.file != "";
  }
}
</script>
