<template>
<div>
  <div class="card">
    <div class="card-header">
      <div class="card-title">Movie editor</div>
    </div>
    <div class="card-body py-1">
      <div class="form-group">
        <label for="solidInput">Anime</label>
        <input v-model="movie.title" type="text" class="form-control input-solid" id="solidInput" placeholder="Solid Input">
      </div>

      <div class="form-group">
        <div class="input-group has-icon">
          <input v-model="movie.image" type="text" placeholder="Poster" class="form-control input-solid">
          <div class="input-group-append">
            <span class="input-group-text input-group-icon" @click="chooseImg"><i class="la la-image"></i></span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group has-icon">
          <input v-model="movie.releaseDate" type="date" placeholder="Release date" class="form-control input-solid">
          <div class="input-group-append">
            <span class="input-group-text input-group-icon"><i class="la la-calendar"></i></span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">Genre:</label>
        <select v-model="movie.genreList"  multiple class="form-control input-solid" id="exampleFormControlSelect2">
          <option v-for="(item, index) in genres" :key="index" :value="item.name">{{item.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="comment">Description</label>
        <textarea v-model="movie.description" class="form-control" id="comment" rows="5"></textarea>
      </div>
    </div>
    <div class="card-action">
      <button @click="submit()" class="btn btn-success">Save change</button>
      <button @click="reset()" class="mx-5 btn btn-danger">Cancel</button>
    </div>
  </div>
</div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Movie, IGenre, MovieData, MovieEnvelope } from "@/services/hyouka-api";
import { Getter } from "vuex-class";
import { CREATE_MOVIE } from "@/store/constant";
import ModalComponent from "@/components/commons/ModalComponent.vue";

@Component({})
export default class MovieEditor extends Vue {
  @Getter("genres")
  genres: Array<IGenre>;
  @Prop({ required: false })
  movie: Movie;

  submit(): void {
    this.$emit("click");
  }

  chooseImg() {
    let explorer = this.$parent.$refs.explorer as ModalComponent;
    explorer.show();
  }
}
</script>