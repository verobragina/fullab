<template>
  <div class="price-item">
    <p class="price-item__name" v-html="data.name"></p>
    <ul class="price-item__list">
      <li class="price-item__list-item" v-for="item in data.list">
        <p class="price-item__list-name" v-html="item.name"></p>
        <span class="price-item__list-line"></span>
        <p class="price-item__list-price" v-html="item.price"></p>
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
export default class BlockMainPriceItem extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.price-item {

}

.price-item__name {
  font-family: $font-family-secondary;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;

  @include phone {
    font-size: 16px;
    text-align: start;
  }
}

.price-item__list {
  @include list-reset;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5px;
  margin-top: 30px;

  @include phone {
    margin-top: 10px;
  }
}

.price-item__list-item {
  display: grid;
  grid-template-columns: auto 1fr max-content;
  align-items: center;
  grid-gap: 10px;

  @include phone {
    grid-template-columns: 190px 1fr max-content;
  }
}

.price-item__list-name {
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%;

  @include phone {
    font-size: 14px;
  }
}

.price-item__list-price {
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%;

  @include phone {
    font-size: 14px;
  }
}

.price-item__list-line {
  height: 1px;
  border-bottom: 1px dashed $white;
}

</style>
