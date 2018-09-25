<template>
    <div class="card">
<div class="card-header ">
    <h4 class="card-title">Movie</h4>
    <p class="card-category">Recent movie</p>
</div>
<div class="card-body">
    <table class="table table-head-bg-info table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Anime</th>
                <th scope="col">Episode</th>
                <th scope="col">Aired</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in movies" :key="index" @click="selected(index)" class="touch" :class="{'bg-success': selectedRow == index}">
                <td>{{item.movieId}}</td>
                <td>{{item.title}}</td>
                <td>{{item.episodeCount}}</td>
                <td>{{item.releaseDate | formatDate}}</td>
                <td>
                    <button @click="edit(index)" class="btn btn-link btn-sm btn-simple-dark"><i class="la la-edit"></i></button>
                </td>
                <td>
                    <button @click="remove(index)" class="btn btn-link btn-sm btn-simple-danger"><i class="la la-times"></i></button>
                </td>
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

  remove(index: number): void {
    this.$emit("remove", this.list[index]);
  }

  edit(index: number): void {
    this.$emit("edit", this.list[index]);
  }
}
</script>


<style scoped>
.touch {
  cursor: pointer;
}
</style>

