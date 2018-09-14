<template>
  <div :class="['wrapper', {nav_open: isNavOpen, topbar_open: isTopbarOpen}]">
		<div class="main-header">
			<admin-header link-to="/home" @toggle-nav="toggleNavbar()" @toggle-topbar="toggleTopbar()"></admin-header>
			<app-header></app-header>
		</div>
			<app-sidebar :links="navs"></app-sidebar> 
      <router-view></router-view>	
	</div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AdminHeader from "@/components/layout/AdminHeader.vue";

import { Getter, Action } from "vuex-class";

import "@/assets/css/bootstrap.min.css";
// import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"';
import "@/assets/css/ready.css";
import "@/assets/css/demo.css";
import { Ilink } from "@/types/layout";
import { AppState } from "@/types/state";
import { LOGIN } from "@/store/constant";
import { LoginData } from "@/services/hyouka-api";
import GenreView from "@/views/GenreView.vue";

@Component({
  components: { AppSidebar, AppHeader, AdminHeader }
})
export default class Dashboard extends Vue {
  navs: Array<Ilink>;
  isNavOpen: boolean = false;
  isTopbarOpen: boolean = false;

  constructor() {
    super();
    this.navs = [
      { url: "/admin", name: "Dashboard", icon: "la la-dashboard" },
      { url: "/create", name: "create", icon: "la la-edit" },
      { url: "/genre", name: "genre", icon: "la la-group" }
    ];
  }

  toggleNavbar(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleTopbar(): void {
    this.isTopbarOpen = !this.isTopbarOpen;
  }
}
</script>
