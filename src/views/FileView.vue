<template>
  <div class="main-panel full-height">
    <div class="content full-height">
      <div class="container-fluid full-height">
        <h4 class="page-title">File Mananger</h4>
        <div class="file-manager">
          <angel-explorer/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.file-manager {
  width: 100%;
  max-width: 1600px;
  height: 80vh;
  max-height: 800px;
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AngelExplorer from "@/components/file/AngelExplorer.vue";

@Component({
  components: {
    AngelExplorer
  }
})
export default class FileView extends Vue {}
</script>


