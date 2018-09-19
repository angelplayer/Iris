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
                        <tr>
                            <td  class="td-actions" colspan="3">
                                <div @click="isAdding = !isAdding" v-if="!isAdding" class="demo-icon mb-0 text-center mouse">
                                    <h5 class="mb-0"><i class="la la-pencil"></i> Add new episode</h5>
                                </div>
                                <div v-else class="form-inline bg-light">
                                    <label @click="isAdding = !isAdding" class="demo-icon mr-auto mouse">
                                        <div class="icon-preview mr-0"><i class="la la la-times"></i></div>
                                    </label>
                                    <input v-model="newEpisode.number" placeholder="No" type="text mx-1" class="form-control mx-1">
                                    <input v-model="newEpisode.name" placeholder="Episdoe name..." type="text mx-1" class="form-control">
                                    <label class="demo-icon px-1 mx-1 mouse">
                                        <div @click="chooseFile()" :class="['icon-preview',newEpisode.file? 'text-info':'']" ><i class="la la-film"></i></div>
                                    </label>
                                    <p  class="form-control-static"></p>
                                    <label class="demo-icon ml-auto mouse">
                                        <div @click="upload()" class="icon-preview"><i class="la la la-plane"></i></div>
                                    </label>
                                </div>
                            </td>
                        </tr>
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
                                    <button type="button" data-toggle="tooltip" title="Edit Task" class="btn btn-link <btn-simple-primary">
                                        <i class="la la-edit"></i>
                                    </button>
                                    <button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-simple-danger">
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
                <i class="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago
            </div>
        </div>
    </div>
</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  IEpisode,
  Episode,
  EpisodesService,
  EpisodeData,
  Command3,
  Command
} from "@/services/hyouka-api";
import { Prop } from "vue-property-decorator";
import { CREATE_EPISODE } from "@/store/constant";

@Component
export default class EpisodeList extends Vue {
  @Prop({ required: true })
  list: Array<IEpisode>;

  @Prop({ required: true })
  movieId: number;

  isAdding: boolean = false;
  newEpisode: EpisodeData = new EpisodeData();

  chooseFile(): void {
    this.newEpisode.file = "abc.mp4";
  }

  upload(): void {
    this.$store.dispatch(CREATE_EPISODE, {
      episode: this.newEpisode,
      movieId: this.movieId
    });
  }
}
</script>

<style>
.mouse {
  cursor: pointer;
}
</style>

