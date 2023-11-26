<template>
  <ul class="base-socials">
    <li class="base-socials__item" v-for="(item, index) in list" :key="index">
      <a class="base-socials__link" :href="item.link" target="_blank">
        <base-svg :icon="item.code"/>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from "nuxt-property-decorator";
import {SocialsElement} from "~/models/socials";

@Component({
components: {
BaseSvg: () => import('~/components/base/svg/BaseSvg.vue')
},
})
export default class BaseSocials extends Vue {
  @Prop()
  list!: Array<SocialsElement>
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.base-socials {
  @include list-reset;
  display: flex;
  align-items: center;
}

.base-socials__item:not(:last-child) {
  margin-right: 18px;
}

.base-socials__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: $blue;
  color: $white;
  border-radius: 50%;
  transition: $base-transition;

  @include hover {
    background: $color-text-hover-link;
  }

  svg {
    display: block;
    width: 22px;
    height: 22px;
  }
}

</style>
