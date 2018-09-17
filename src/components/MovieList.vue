<template>
    <div class="card">
<div class="card-header ">
    <h4 class="card-title">Movie</h4>
    <p class="card-category">Recent movie</p>
</div>
<div class="card-body">
    <table class="table table-head-bg-success table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Anime</th>
                <th scope="col">Episode</th>
                <th scope="col">Aired</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in movies" :key="index" @click="selected(index)" :class="{'bg-primary text-white': selectedRow == index}">
                <td>{{item.movieId}}</td>
                <td>{{item.title}}</td>
                <td>{{item.episodeCount}}</td>
                <td>{{item.releaseDate | formatDate}}</td>
            </tr>
        </tbody>
    </table>
</div>
</div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IMovie } from "@/services/hyouka-api";
import { EventEmitter } from "events";

@Component({})
export default class MovieList extends Vue {
  @Prop() list: Array<IMovie>;

  selectedInex: number = -1;

  get movies() {
    return this.list;
  }

  get selectedRow() {
    return this.selectedInex;
  }

  selected(index: number) {
    this.selectedInex = this.selectedInex == index ? -1 : index;
    this.$emit(
      "selected",
      this.selectedInex != -1 ? this.list[this.selectedInex] : null
    );
  }
}
</script>

