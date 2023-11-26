<template>
  <div class="about-item">
    <div class="about-item__picture">
      <img :src="data.picture" alt="">
    </div>
    <p class="about-item__name" v-html="data.name"></p>
    <ul class="about-item__list">
      <li class="about-item__list-item" v-for="item in data.list">
        <p class="about-item__list-text" v-html="item"></p>
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
  },
})
export default class BlockMainAboutItem extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.about-item {
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 30px;
  justify-content: center;

  @include tablet {
    justify-content: unset;
  }

  @include phone {
    grid-gap: 15px;
  }
}

.about-item__picture {
  height: 100%;
  max-height: 200px;

  img {
    @include contain-img;
  }

  @include phone {
    max-height: 160px;
  }
}

.about-item__name {
  font-family: $font-family-secondary;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: $blue;

  @include phone {
    font-size: 24px;
  }
}

.about-item__list {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5px;
  padding-left: 18px;
  list-style: outside;
}

.about-item__list-text {
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @include phone {
    font-size: 14px;
  }
}

</style>
