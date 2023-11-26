<template>
  <a v-if="isAbsolute" :class="['base-link']" :href="url">
    <slot></slot>
  </a>
  <nuxt-link v-else :to="to" :class="['base-link']">
    <slot></slot>
  </nuxt-link>
</template>

<!--suppress ES6PreferShortImport -->
<script lang="ts">

import Vue from "vue";
import {Component, mixins, Prop} from "nuxt-property-decorator"
import {RawLocation} from 'vue-router'
import UrlMixin from '../../../mixins/url'

@Component
export default class BaseLink extends mixins(UrlMixin, Vue) {
  @Prop()
  to!: RawLocation

  @Prop({default: false})
  absolute!: boolean

  get url() {
    return this.absoluteUrl(this.to);
  }

  get isAbsolute() {
    if (this.absolute) {
      return true;
    }

    return this.isAbsoluteUrl(this.to);
  }
};
</script>
