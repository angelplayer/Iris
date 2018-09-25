<template>
<div class="main-panel">
        <div class="content w-100">
            <div class="container-fluid">
                <h4 class="page-title">File</h4>
                <div style="height:100vh" data-ng-app="FileManagerApp">
                    <angular-filemanager></angular-filemanager>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import jQuery from "jquery";
window.jQuery = jQuery;
window.$ = jQuery;
import PopperJs from "popper.js";
// require("../../node_modules/bootstrap/dist/js/bootstrap.js");
require("@/assets/file/angular.min.js");
require("@/assets/file/ng-file-upload.min.js");
require("@/assets/file/angular-translate.min.js");
require("@/assets/file/helper.js");
// require("@/assets/file/bs/bootstrap.min.css");
// require("@/assets/file/bs/bootstrap-watch.min.css");
require("@/assets/file/angular-filemanager.min.js");
// require("@/assets/file/angular-filemanager.min.css");
require("@/assets/file.js");

@Component
export default class FileView extends Vue {
  mounted() {
    this.$nextTick(() => {});
  }
}
</script>

<style scoped src="@/assets/file/bs/bootstrap.min.css"></style>
<style scoped src="@/assets/file/bs/bootstrap-watch.min.css"></style>
<style scoped src="@/assets/file/angular-filemanager.min.css"></style>
