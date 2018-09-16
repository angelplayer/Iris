<template>
  <div class="main-panel">
    <div class="content">
      <div class="container-fluid">
        <h4 class="page-title">Creator</h4>
        <div class="row">
          <div class="col-md-4">
            <movie-card :movie="movie"></movie-card>
          </div>
          <div class="col-md-8">
            <movie-editor :movie="movie"></movie-editor>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MovieEditor from "@/components/MovieEditor.vue";
import MovieCard from "@/components/MovieCard.vue";
import { IMovie, Movie } from "@/services/hyouka-api";

@Component({
  components: {
    MovieEditor,
    MovieCard
  }
})
export default class Creator extends Vue {
  movie: Movie = new Movie();
}
</script>