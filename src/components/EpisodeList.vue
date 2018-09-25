<template>
    <div class="card card-tasks">
        <div class="card-header ">
            <h4 class="card-title">Episodes</h4>
            <p class="card-category">Episodes List</p>
        </div>
        <div class="card-body ">
            <div class="table-full-width">
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input  select-all-checkbox" type="checkbox" data-select="checkbox" data-target=".task-select">
                                        <span class="form-check-sign"></span>
                                    </label>
                                </div>
                            </th>
                            <th>Episode</th>
                            <th class="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in list" :key="index">
                            <td>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input task-select" type="checkbox">
                                        <span class="form-check-sign"></span>
                                    </label>
                                </div>
                            </td>
                            <td>{{item.name}}</td>
                            <td class="td-actions text-right">
                                <div class="form-button-action">
                                    <button @click="remove(item)" type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-simple-danger">
                                        <i class="la la-times"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer ">
            <div class="stats">
                <!-- <i class="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago -->
            </div>
        </div>
    </div>
</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Uploader from "@/components/Uploader.vue";
import {
  IEpisode,
  Episode,
  EpisodesService,
  EpisodeData,
  Command3,
  Command
} from "@/services/hyouka-api";
import { Prop, Watch } from "vue-property-decorator";
import {
  CREATE_EPISODE,
  FETCH_EPISODES,
  DELETE_EPISODE
} from "@/store/constant";

@Component
export default class EpisodeList extends Vue {
  @Prop({ required: true })
  list: Array<IEpisode>;

  @Prop({ required: false, default: false })
  movieId: number;

  remove(episode: IEpisode): void {
    this.$store.dispatch(DELETE_EPISODE, episode);
  }
}
</script>

<style>
.mouse {
  cursor: pointer;
}
</style>

