<template>
  <section class="main-about" :id="data.id" v-if="data">
    <div class="container">
      <div class="main-about__inner">
        <h2 class="main-about__title page__title page__title--centered page__title--green" v-html="data.title"></h2>
        <ul class="main-about__blocks">
          <li class="main-about__blocks-item" v-for="item in data.blocks">
            <BlockMainAboutItem :data="item"/>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins, Prop} from "nuxt-property-decorator"
import PathMixin from "~/mixins/path";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
    BlockMainAboutItem: () => import('~/components/blocks/main/BlockMainAboutItem.vue'),
  },
})
export default class BlockMainAbout extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.main-about {
  padding: 71px 0 146px;

  @include tablet {
    padding: 70px 0;
  }

  @include phone {
    padding: 30px 0;
  }
}

.main-about__inner {
  padding: 0 50px;

  @include tablet {
    padding: 0;
  }
}

.main-about__title {
  @include phone {
    text-align: start!important;
  }
}

.main-about__blocks {
  @include list-reset;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 120px;
  grid-row-gap: 112px;
  margin-top: 74px;

  @include tablet {
    grid-template-columns: 1fr;
    grid-row-gap: 36px;
    margin-top: 25px;
  }
}

</style>
