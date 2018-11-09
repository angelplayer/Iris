<template>
<nav class="navbar navbar-header navbar-expand-lg">
    <div class="container-fluid">
        <form class="navbar-left navbar-form nav-search mr-md-3" action="">
            <div class="input-group my-2">
                <input type="text" placeholder="Search ..." class="form-control">
                <div class="input-group-append">
                    <span class="input-group-text">
                        <i class="la la-search search-icon"></i>
                    </span>
                </div>
            </div>
        </form>
    </div>
</nav>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AppHeader extends Vue {}
</script>
