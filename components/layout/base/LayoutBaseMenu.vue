<template>
  <div class="header-menu">
    <ul class="header-menu__list">
      <li class="header-menu__list-item" v-for="item in $store.state.base.menu">
        <button class="header-menu__link" @click="handleLinkClick(item.link)" v-html="item.name"></button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins, Prop} from "nuxt-property-decorator"
import PathMixin from "~/mixins/path";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
    BaseCollapse: () => import('~/components/base/collapse/BaseCollapse.vue'),
  },
})
export default class LayoutBaseMenu extends mixins(PathMixin, Vue) {
  handleLinkClick(link: string) {
    this.$modal.hide('menu-modal')
    this.$router.push(link)
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.header-menu {
  padding: 29px 6px 14px;
}

.header-menu__list {
  @include list-reset;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 11px;
}

.header-menu__link {
  @include button-reset;
  font-family: $font-family-secondary;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}

</style>
