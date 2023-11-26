<template>
  <div class="page">
    <div class="page__wrapper">
      <layout-base-header/>
      <Nuxt/>
      <layout-base-footer/>
    </div>

    <BaseModal name="application-modal" title="Заявка">
      <BlockFormApplication/>
    </BaseModal>
    <BaseModal name="menu-modal" size="small">
      <LayoutBaseMenu/>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import Vue, {ComponentOptions} from 'vue'
import {Component, mixins} from 'nuxt-property-decorator'
import LayoutBaseHeader from "~/components/layout/base/LayoutBaseHeader.vue";
import LayoutBaseFooter from "~/components/layout/base/LayoutBaseFooter.vue";

@Component({
  components: {
    LayoutBaseHeader,
    LayoutBaseFooter,
    BlockFormApplication: () => import('~/components/blocks/form/BlockFormApplication.vue'),
  }
})
export default class DefaultLayout extends mixins(Vue) implements ComponentOptions<Vue> {
  async fetch() {
    await Promise.all([
      this.$store.dispatch('getBase'),
    ])
  }

  setHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }


  mounted() {
    this.setHeight();
    window.addEventListener('resize', this.setHeight);
  }
}
</script>
