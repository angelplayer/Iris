<template>
  <div class="main-panel">
    <div class="content">
      <div class="container-fluid">
        <h4 class="page-title">Creator</h4>
        <div class="row">
          <div class=""></div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <movie-card :movie="movie"></movie-card>
          </div>
          <div class="col-md-8">
            <movie-editor :movie="movie" @click="isEditing ? edit() : create()"></movie-editor>
          </div>
        </div>
      </div>
    </div>
    <modal-component ref="explorer" vWidth="1000" vHeight="500">
      <angel-explorer pickable="true" @onpick="insertImg"/>
    </modal-component>
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MovieEditor from "@/components/MovieEditor.vue";
import MovieCard from "@/components/MovieCard.vue";
import ModalComponent from "@/components/commons/ModalComponent.vue";
import AngelExplorer from "@/components/file/AngelExplorer.vue";
import { CREATE_MOVIE, UPDATE_MOVIE } from "@/store/constant";
import {
  IMovie,
  IGenre,
  Movie,
  MovieData,
  MovieEnvelope,
  MovieData2,
  MoviesService
} from "@/services/hyouka-api";
import { Getter } from "vuex-class";

@Component({
  components: {
    MovieEditor,
    MovieCard,
    ModalComponent,
    AngelExplorer
  }
})
export default class Creator extends Vue {
  @Getter("genres")
  genres: Array<IGenre>;

  movie: Movie = new Movie();
  isEditing: boolean = false;

  constructor() {
    super();
    this.movie.genreList = [];
  }

  created(): void {
    let id: string = this.$route.params.id;
    if (id) {
      this.isEditing = true;
      new MoviesService().get2(parseInt(id)).then(evenlope => {
        this.movie = evenlope.movie;
      });
    }
  }

  create(): void {
    this.$store.state.app.isLoading = true;
    let data = new MovieData({
      title: this.movie.title,
      description: this.movie.description,
      realeaseDate: this.movie.releaseDate,
      genreList: this.genres
        .filter(e => this.movie.genreList.includes(e.name))
        .map(x => x.genreId),
      image: this.movie.image
    });
    this.$store.dispatch(CREATE_MOVIE, data).then((envelope: MovieEnvelope) => {
      this.$store.state.app.isLoading = false;
      this.$router.push({ name: "main-view" }); // TODO: navigate to view movie page
    });
  }

  edit(): void {
    console.log(this.movie.releaseDate);
    let data = new MovieData2({
      title: this.movie.title,
      description: this.movie.description,
      realeaseDate: this.movie.releaseDate,
      image: this.movie.image
    });
    this.$store
      .dispatch(UPDATE_MOVIE, {
        id: this.movie.movieId,
        movie: data
      })
      .then(() => this.$router.push({ name: "main-view" }));
  }

  insertImg(content) {
    this.$set(this.movie, "image", content.path);
  }
}
</script>