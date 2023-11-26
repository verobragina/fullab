<template>
  <main class="page__main" v-if="$store.state.main.data">
    <h1 class="visually-hidden">Fullab</h1>
    <BlockMainPromo :data="$store.state.main.data.banner"/>
    <BlockMainPartners :data="$store.state.main.data.partners"/>
    <BlockMainAbout :data="$store.state.main.data.about"/>
    <BlockMainPrice :data="$store.state.main.data.price"/>
    <BlockMainAction :data="$store.state.main.data.action"/>
    <BlockMainAdvantages :data="$store.state.main.data.advantages"/>
    <BlockMainRoad :data="$store.state.main.data.road"/>
    <BlockFaq :data="$store.state.faq.data"/>
    <BlockContacts :data="$store.state.contacts.data"/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins} from "nuxt-property-decorator"
import MetaMixin from "~/mixins/meta"
import PathMixin from "~/mixins/path"

@Component({
  transition: 'fadeOpacity',
  scrollToTop: true,
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
    BlockMainPromo: () => import('~/components/blocks/main/BlockMainPromo.vue'),
    BlockMainPartners: () => import('~/components/blocks/main/BlockMainPartners.vue'),
    BlockMainAbout: () => import('~/components/blocks/main/BlockMainAbout.vue'),
    BlockMainPrice: () => import('~/components/blocks/main/BlockMainPrice.vue'),
    BlockMainAction: () => import('~/components/blocks/main/BlockMainAction.vue'),
    BlockMainAdvantages: () => import('~/components/blocks/main/BlockMainAdvantages.vue'),
    BlockMainRoad: () => import('~/components/blocks/main/BlockMainRoad.vue'),
    BlockFaq: () => import('~/components/blocks/faq/BlockFaq.vue'),
    BlockContacts: () => import('~/components/blocks/contacts/BlockContacts.vue'),
  },
})
export default class IndexPage extends mixins(MetaMixin, PathMixin, Vue) {
  async fetch() {
    await Promise.all([
      this.$store.dispatch('main/getData'),
      this.$store.dispatch('faq/getData'),
      this.$store.dispatch('contacts/getData'),
    ])
  }

  head() {
    // if (this.$store.state.main.item) {
    //   return this.getMetaTags(this.$store.state.main.item.meta)
    // }
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/scss/helpers/_variables.scss";
@import "../assets/scss/helpers/_mixins.scss";


</style>
