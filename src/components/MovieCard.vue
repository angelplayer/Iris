<template>
  <div class="card">
    <div class="card-header">
    <h4 class="card-title">{{movie.title}}</h4>
    <p class="card-category">{{movie.releaseDate | formatDate}}</p>
    </div>
  <img class="card-img-top" src="../../public/img/auth.jpg" alt="poster">
  <div class="card-body">
    <p class="card-text">{{movie.description}}</p>
    <span v-for="(item, index) in movie.genreList" :key="index" class="badge badge-default">
      {{item}}
    </span>
  </div>
  <div class="card-footer">
    <div class="legend"><i class="la la-circle text-primary"></i> Completed</div>
  </div>
</div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IMovie } from "@/services/hyouka-api";

@Component({})
export default class MovieCard extends Vue {
  @Prop({required: true}) movie: IMovie;
}
</script>
