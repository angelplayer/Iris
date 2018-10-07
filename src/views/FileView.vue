<template>
  <div class="main-panel full-height">
    <div class="content full-height">
      <div class="container-fluid full-height">
        <h4 class="page-title">File Mananger</h4>
        <div class="card">
          <div class="card-header">
            <p class="card-title">Folder <a @click="createFolder" class="btn btn-sm float-right" >New Folder</a></p>
            <p class="card-subtitle">{{currentPath}}</p>
          </div>
          <div class="card-body">
            <div class="file-container">
              <div class="file-content">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th class="w-75">Name</th>
                      <th class="" colspan="1">Last modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in sortedFileItems" :key="index" @dblclick="open(item)">
                      <td><i class="file-icon " :class="fileType(item.type)"></i></td>
                      <td>{{item.name}}</td>
                      <td>{{item.date | formatDate }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <content-modal ref="previewer"/>
        <component @submit="submit()" :is="modalComp"  ref="modalComp"></component>
      </div>
    </div>
  </div>

</template>


<style scoped>
.full-height {
  height: 100%;
}

.file-content {
  display: flex;
  flex-wrap: wrap;
  font-family: "Roboto Mono";
  font-weight: 500;
}

.file-container {
  height: 450px;
  overflow-y: scroll;
}
.file-icon {
  font-size: 1.8rem;
  color: rgb(17, 164, 223);
}
</style>





<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ContentModal from "@/components/file/ContentModal.vue";
import CreateFolderModal from "@/components/file/CreateFolderModal.vue";

import {
  FileService,
  ActionCommand,
  FileResultEnvelope,
  IFileData,
  FileData
} from "@/services/hyouka-api";

@Component({
  components: {
    ContentModal,
    CreateFolderModal
  }
})
export default class FileView extends Vue {
  basePath = "/";
  currentPath: string = null;

  fileItem: Array<IFileData>;

  modalComp: any = null;

  constructor() {
    super();
    this.currentPath = this.basePath;
    this.fileItem = new Array<IFileData>();
  }

  mounted() {
    this.$nextTick(() => {});
    this.fetchFile(this.currentPath);
  }

  get sortedFileItems() {
    return this.fileItem.sort((a, b) => {
      return a.type == "dir" ? -1 : 1;
    });
  }

  open(file: FileData) {
    if (file.type == "dir") {
      this.currentPath += file.name + "/";
      this.fetchFile(this.currentPath);
    } else if (file.type == "file") {
      let source = this.currentPath + file.name;
      (this.$refs.previewer as ContentModal).show(source);
    }
  }

  createFolder() {
    this.modalComp = "CreateFolderModal";
    let component = this.$refs.modalComp as CreateFolderModal;
    component.show();
    component.setPath(this.currentPath);
  }

  submit() {
    this.fetchFile(this.currentPath);
  }

  fileType(type: string) {
    return type == "dir" ? "la la-folder" : "la la-file";
  }

  fetchFile(path: string) {
    new FileService()
      .navigate(new ActionCommand({ action: "list", path: path }))
      .then(envelope => {
        console.log(envelope);
        this.fileItem = envelope.result;
      });
  }
}
</script>