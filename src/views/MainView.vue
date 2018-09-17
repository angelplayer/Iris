<template>
    <div class="main-panel">
        <div class="content">
            <div class="container-fluid">
                <h4 class="page-title">Dashboard</h4>
                <div class="row">
                    <div class="col-md-8">
                        <movie-list :list="movies" @selected="onSelected" @edit="edit" @remove="remove"></movie-list>
                    </div>
                    <div class="col-md-4">
                        <movie-card :movie="selectedMovie"></movie-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MovieList from "@/components/MovieList.vue";
import MovieCard from "@/components/MovieCard.vue";
import { State, Getter } from "vuex-class";
import { IMovie, Movie, MoviesService } from "@/services/hyouka-api";
import { FETCH_MOVIES, DELETE_MOVIE } from "@/store/constant";

@Component({
  components: {
    MovieList,
    MovieCard
  }
})
export default class MainView extends Vue {
  @Getter("movieItems") movies: Array<IMovie>;

  selectedMovie: IMovie = null;

  mounted() {
    this.$store.dispatch(FETCH_MOVIES, null, { root: true });
  }

  onSelected(movie: Movie): void {
    this.selectedMovie = movie;
  }

  edit(movie: Movie): void {
    this.$router.push({
      name: "create",
      params: { id: movie.movieId.toString() }
    });
  }

  remove(movie: Movie): void {
    this.$store.dispatch(DELETE_MOVIE, movie.movieId);
  }
}
</script>
