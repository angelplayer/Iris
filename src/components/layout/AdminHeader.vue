<template>
    <div class="logo-header">
        <a :href="linkTo" class="logo">
            Angel Otaku
        </a>
        <button @click="toggleNavbar()" class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <button  @click="toggleTopbar()" class="topbar-toggler more"><i class="la la-ellipsis-v"></i></button>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class AdminHeader extends Vue {
  @Prop({ default: "/", required: false })
  linkTo?: string;

  toggleNavbar(): void {
    this.$emit("toggle-nav");
  }

  toggleTopbar(): void {
    this.$emit("toggle-topbar");
  }
}
</script>
