<template>
    <div class="main-panel">
        <div class="content">
            <div class="container-fluid">
                <h4 class="page-title">Watch</h4>
                <div class="row">
                      <div class="col-sm-12">
                        <div class="card">
                        <div class="card-header">{{episode.name}}</div>
                          <div class="player-container card-body">
                              <audio v-if="episode" autoplay>
                                <source class="player" :src="episode.file"/>
                              </audio>
                              <img v-else  class="player" :src="source"/>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import { IEpisode, EpisodesService, Episode } from "@/services/hyouka-api";
import { Prop, Component } from "vue-property-decorator";
import { episode } from "@/store/episode-state";

@Component
export default class WatcheView extends Vue {
  // @Prop({ default: { file: "" }, required: false })
  episode: IEpisode = new Episode();

  created() {
    let m = this.$route.params.m;
    // let id = this.$route.params.vid;
    if (m) {
      new EpisodesService()
        .get(parseInt(m))
        .then(x => (this.episode = x.episodes[0]));
    }
  }
}
</script>


<style scoped>
.player {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.player-container {
  border: 1px solid rgba(128, 128, 128, 0.1);
  padding: 5px;
}
</style>
