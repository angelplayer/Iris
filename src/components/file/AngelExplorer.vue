<template>
    <div class="explorer">
      <div class="ex-header">
        <breadcrum :data="navigator.directory" @navigate="changeDirectory"/>
        <div class="nav-action">
          <button @click="createFolder" class="cool button"><i class="la la-plus"></i></button>
          <button @click="uploadFile" class="cool button"><i class="la la-upload"></i></button>
        </div>
      </div>
      <div class="ex-body">
        <ul class="file-list unstyled-list">
          <li class="file-list-item" v-for="(item, index) in sortedFileItems" :key="index" >
            <!-- <label for="">
              <input type="checkbox"/>
            </label> -->
            <div class="item file-item-logo">
              <span class="file-icon"><i :class="fileType(item.type)"></i></span>
            </div>
            <div class="item file-item-meta">
              <a @dblclick="open(item)" class="file-meta-name">
                <span>{{item.name}}</span>
              </a>
              <span>{{item.size}}</span>
              <span>{{item.date}}</span>
            </div>
            <div class="item file-item-action">
              <button @click="rename(item)" class="button">Rename</button>
              <button @click="open(item)" class="button">Preview</button>
              <button @click="download(item)" class="button">Download</button>
              <button @click="remove(item)" class="button">Delete</button>
              <elipse-button icon="la la-home" button="button" text="Action" :content="actionsButton" :params="item"/>
            </div>
          </li>
        </ul>
      </div>
      <content-modal ref="previewer"/>
      <rename-modal  @submit="submit" ref="renameModal"/>
      <create-folder-modal @submit="submit" ref="createModal"/>
      <upload-file-modal @submit="submit" ref="uploadModal"/>
    </div>
</template>


<style scoped>
.bg-none {
  background: none;
}
.explorer {
  background-color: white;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(128, 128, 128, 0.1);
  box-shadow: 2px 2px 8px rgba(128, 128, 128, 0.301);
  margin: 15px auto;
  font-family: "Roboto Mono";
}
.ex-header {
  height: 10%;
  display: flex;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
}
.nav-action {
  margin-left: auto;
}
.ex-body {
  padding: 5px;
  height: 90%;
  width: 100%;
  border-top: 1px solid rgba(128, 128, 128, 0.1);
  overflow-y: scroll;
}
.file-list {
  width: 100%;
  margin: 0;
  padding: 0;
}
.file-list-item {
  border-bottom: 1px solid rgba(28, 139, 212, 0.1);
  display: flex;
  padding: 5px 5px;
  flex: 1 1 0%;
  flex-direction: row;
}
.file-list-item:hover {
  background: rgba(100, 148, 237, 0.1);
}
.item {
  display: flex;
  align-items: center;
}

.file-item-logo {
  width: 50px;
}
.file-item-meta {
  flex: 2 1 0%;
  flex-direction: row;
}
.file-meta-name:hover {
  cursor: pointer;
}

.file-item-meta > * {
  flex: 1 1 0;
  word-break: break-all;
}

.file-meta-name,
.file-meta-name span {
  flex: 2 1 0%;
  padding-top: 5px;
  padding-bottom: 5px;
}

.file-item-action {
  align-self: center;
  font-weight: 600;
}
.file-icon {
  font-size: 30px;
}
</style>
<style>
.button {
  border: none;
  padding: 7px 13px;
  cursor: pointer;
}
.cool {
  background-color: DodgerBlue !important;
  color: white !important;
}

.control {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(100, 148, 237, 0);
  border-radius: 0;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none; /* remove underline from anchors */
}
.control:focus {
  border: 1px solid rgba(100, 148, 237, 0.3);
}
</style>


<script lang="ts">
import Vue from "vue";
import { IFileData, FileService, ActionCommand } from "@/services/hyouka-api";
import ContentModal from "@/components/file/ContentModal.vue";
import CreateFolderModal from "@/components/file/CreateFolderModal.vue";
import UploadFileModal from "@/components/file/UploadFileModal.vue";
import Component from "vue-class-component";
import Breadcrum from "@/components/file/Breadcrum.vue";
import DirectoryNavigator from "@/types/Navigator.ts";
import RenameModal from "@/components/file/RenameModal.vue";
import ElipseButton from "@/components/file/ElipseButton.vue";

@Component({
  components: {
    ContentModal,
    CreateFolderModal,
    UploadFileModal,
    Breadcrum,
    RenameModal,
    ElipseButton
  }
})
export default class AngelExplorer extends Vue {
  basePath = "/";
  dropdown = false;
  fileItem: Array<IFileData>;
  navigator: DirectoryNavigator;

  currentPath: string = null;

  modalComp: any = null;

  actionsButton: Array<{ name; hanlder; enable: boolean }> = [];

  constructor() {
    super();
    this.currentPath = this.basePath;
    this.fileItem = new Array<IFileData>();
    this.navigator = new DirectoryNavigator(this.basePath);
  }

  mounted() {
    this.actionsButton = [
      { name: "Preview", enable: true, hanlder: this.open },
      { name: "Download", enable: true, hanlder: this.download },
      { name: "Delete", enable: true, hanlder: this.remove },
      { name: "Rename", enable: true, hanlder: this.rename }
    ];
    this.$nextTick(() => {});
    this.fetchFile(this.currentPath);
  }

  get sortedFileItems() {
    return this.fileItem.sort((a, b) => {
      return a.type == "dir" ? -1 : 1;
    });
  }

  changeDirectory(directory) {
    this.navigator
      .jump(directory)
      .then(path => (this.currentPath = path))
      .then(() => this.fetchFile(this.currentPath));
  }

  open(file: IFileData) {
    if (file.type == "dir") {
      this.navigator
        .go(file.name)
        .then(path => (this.currentPath = path))
        .then(() => this.fetchFile(this.currentPath));
    } else if (file.type == "file") {
      let source = this.currentPath + "/" + file.name;
      (this.$refs.previewer as ContentModal).show(source);
    }
  }

  download(file: IFileData) {
    new FileService()
      .download("download", this.currentPath + "/" + file.name)
      .then(envelope => {
        console.log(envelope.data); //envelope.data if file binary (blob)
      })
      .catch(e => console.error(e))
      .finally(() => {
        this.submit();
      });
  }

  rename(file: IFileData) {
    let component = this.$refs.renameModal as RenameModal;
    component.rename(this.currentPath + "/", file.name);
    component.show();
  }

  remove(file: IFileData) {
    new FileService()
      .fileAction(
        new ActionCommand({
          action: "remove",
          items: [this.currentPath + "/" + file.name]
        })
      )
      .then(envelop => console.log(envelop.result.success))
      .catch(e => console.log(e))
      .finally(() => {
        this.submit();
      });
  }

  createFolder() {
    let component = this.$refs.createModal as CreateFolderModal;
    component.show();
    component.setPath(this.currentPath + "/");
  }

  uploadFile() {
    let component = this.$refs.uploadModal as UploadFileModal;
    component.show();
    component.setPath(this.currentPath);
  }

  submit() {
    this.fetchFile(this.currentPath);
  }

  fileType(type: string) {
    return type == "dir" ? "fa fa-folder text-info" : "fa fa-file text-info";
  }

  fetchFile(path: string) {
    return new FileService()
      .navigate(new ActionCommand({ action: "list", path: path }))
      .then(envelope => {
        this.fileItem = envelope.result;
      });
  }

  get actionEnableButton() {
    return this.actionsButton.filter(x => x.enable);
  }
}
</script>
