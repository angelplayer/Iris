<template>
    <div class="main-panel full-height">
        <div class="content full-height">
            <div class="container-fluid full-height">
              <h4 class="page-title">File Mananger</h4>
              <!-- <file-manager-component style="height:100vh"/> -->
              <div class="row h-100 bg-dark full-height text-white">
                <div class="col-sm-3 bg-info full-height">
                  <div class="pt-2">
                    <p>File Explorer</p>
                  </div>
                  <div>
                    <ul>
                      <li>A</li>
                      <li>B</li>
                      <li>C</li>
                    </ul>
                  </div>
                </div>
                <div class="col-sm-9 bg-danger full-height"></div>
              </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import FileManagerComponent from "@/components/file/FileManagerComponent.vue";

@Component({
  components: {
    // FileManagerComponent
  }
})
export default class FileView extends Vue {
  mounted() {
    this.$nextTick(() => {});
  }
}
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>


