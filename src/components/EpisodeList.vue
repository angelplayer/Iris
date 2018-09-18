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
                        <tr v-for="(item, index) in episodes" :key="index">
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
import { IEpisode } from "@/services/hyouka-api";

@Component
export default class EpisodeList extends Vue {
  episodes: Array<IEpisode>;

  constructor() {
    super();
    this.episodes = [
      {
        episodeId: 1,
        name: "The beginning",
        number: "1",
        file: "abc.mp4",
        movieId: 1
      }
    ];
  }
}
</script>