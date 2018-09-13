<template>
    <div class="sidebar">
        <div class="scrollbar-inner sidebar-wrapper">
            <div class="user">
                <div class="photo">
                    <img src="img/profile.jpg">
                </div>
                <div class="info">
                    <a @click.prevent="toggleShow()" class="" data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                        <span>
                            {{username}}
                            <span class="user-level">Administrator</span>
                            <span class="caret"></span>
                        </span>
                    </a>
                    <div class="clearfix"></div>

                    <div :class="['collapse in', {show: isProfileShow } ]" id="collapseExample" aria-expanded="true" style="">
                        <ul class="nav">
                            <li>
                                <a href="#profile">
                                    <span class="link-collapse">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#edit">
                                    <span class="link-collapse">Edit Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#settings">
                                    <span class="link-collapse">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="nav">
                <li class="nav-item active" v-for="(item, index) in links" :key="index">
                     <router-link :to="item.url">
                        <i :class="item.icon"></i>
                        <p>{{item.name}}</p>
                        <span class="badge badge-count">5</span>
                     </router-link>
                </li>
                <li class="nav-item">
                    <a href="components.html">
                        <i class="la la-table"></i>
                        <p>Components</p>
                        <span class="badge badge-count">14</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="forms.html">
                        <i class="la la-keyboard-o"></i>
                        <p>Forms</p>
                        <span class="badge badge-count">50</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="tables.html">
                        <i class="la la-th"></i>
                        <p>Tables</p>
                        <span class="badge badge-count">6</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="notifications.html">
                        <i class="la la-bell"></i>
                        <p>Notifications</p>
                        <span class="badge badge-success">3</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="typography.html">
                        <i class="la la-font"></i>
                        <p>Typography</p>
                        <span class="badge badge-danger">25</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="icons.html">
                        <i class="la la-fonticons"></i>
                        <p>Icons</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Ilink } from "@/types/layout.ts";
import { Getter } from "vuex-class";

@Component
export default class AppSidebar extends Vue {
  @Prop({ required: false })
  links?: Array<Ilink>;

  @Getter username: string;

  isProfileShow: boolean = false;

  toggleShow(): void {
    this.isProfileShow = !this.isProfileShow;
  }
}
</script>