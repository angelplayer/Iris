<template>
<div class="main-panel">
        <div class="content">
            <file-manager-component style="height:100vh"/>
        </div>
    </div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FileManagerComponent from "@/components/file/FileManagerComponent.vue";

@Component({
  components: {
    FileManagerComponent
  }
})
export default class FileView extends Vue {
  mounted() {
    this.$nextTick(() => {});
  }
}
</script>

