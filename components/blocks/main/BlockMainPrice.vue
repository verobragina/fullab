<template>
  <section class="main-price" :id="data.id" v-if="data">
    <div class="container">
      <div class="main-price__inner">
        <h2 class="page__title page__title--centered page__title--light" v-html="data.title"></h2>
        <div class="main-price__blocks">
          <BlockMainPriceItem :data="item" v-for="item in data.blocks"/>
        </div>
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
    BlockMainPriceItem: () => import('~/components/blocks/main/BlockMainPriceItem.vue'),
  },
})
export default class BlockMainPrice extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.main-price {
  position: relative;
  padding: 48px 0 103px;
  background-color: $green;

  @include phone {
    padding: 30px 0;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg width='1439' height='902' viewBox='0 0 1439 902' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='306.174' cy='84.0942' rx='18.585' ry='26.9483' transform='rotate(-37.641 306.174 84.0942)' fill='white'/%3E%3Cpath d='M324.91 69.6447C329.401 75.4673 331.825 81.9772 332.134 87.7793C332.443 93.5839 330.638 98.6274 326.742 101.633C322.845 104.638 317.509 105.102 311.973 103.328C306.44 101.555 300.76 97.5568 296.269 91.7342C291.778 85.9116 289.354 79.4017 289.045 73.5996C288.736 67.7949 290.541 62.7514 294.437 59.7463C298.334 56.7411 303.67 56.2771 309.206 58.0508C314.739 59.8238 320.42 63.8221 324.91 69.6447Z' fill='white' stroke='%2318325B'/%3E%3Cellipse cx='1121.33' cy='421.564' rx='18.585' ry='26.9483' transform='rotate(-119.085 1121.33 421.564)' fill='white'/%3E%3Cpath d='M1109.83 400.886C1116.26 397.312 1123.05 395.884 1128.84 396.441C1134.62 396.999 1139.34 399.534 1141.73 403.834C1144.13 408.135 1143.79 413.481 1141.21 418.691C1138.64 423.899 1133.84 428.921 1127.41 432.496C1120.99 436.07 1114.19 437.498 1108.4 436.941C1102.62 436.383 1097.9 433.848 1095.51 429.548C1093.12 425.247 1093.45 419.901 1096.03 414.691C1098.6 409.483 1103.4 404.461 1109.83 400.886Z' fill='white' stroke='%2318325B'/%3E%3Cellipse cx='306.174' cy='794.094' rx='18.585' ry='26.9483' transform='rotate(-37.641 306.174 794.094)' fill='white'/%3E%3Cpath d='M324.91 779.645C329.401 785.467 331.825 791.977 332.134 797.779C332.443 803.584 330.638 808.627 326.742 811.633C322.845 814.638 317.509 815.102 311.973 813.328C306.44 811.555 300.76 807.557 296.269 801.734C291.778 795.912 289.354 789.402 289.045 783.6C288.736 777.795 290.541 772.751 294.437 769.746C298.334 766.741 303.67 766.277 309.206 768.051C314.739 769.824 320.42 773.822 324.91 779.645Z' fill='white' stroke='%2318325B'/%3E%3C/svg%3E%0A");

    @include tablet {
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      height: 120px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='238' height='65' viewBox='0 0 238 65' fill='none'%3E%3Cellipse cx='217.691' cy='44.826' rx='10' ry='14.5' transform='rotate(-119.085 217.691 44.826)' fill='white'/%3E%3Cpath d='M211.615 33.9021C215.037 31.9987 218.648 31.2434 221.708 31.5385C224.77 31.8337 227.228 33.1703 228.467 35.3988C229.707 37.6273 229.546 40.4205 228.182 43.1779C226.819 45.933 224.273 48.6029 220.851 50.5063C217.429 52.4097 213.817 53.165 210.758 52.87C207.696 52.5747 205.238 51.2382 203.998 49.0096C202.758 46.7811 202.919 43.9879 204.283 41.2305C205.646 38.4754 208.193 35.8055 211.615 33.9021Z' fill='white' stroke='%2318325B'/%3E%3Cellipse cx='16.7739' cy='19.421' rx='10' ry='14.5' transform='rotate(-37.641 16.7739 19.421)' fill='white'/%3E%3Cpath d='M26.6722 11.7872C29.0635 14.8878 30.3477 18.3466 30.5112 21.4161C30.6748 24.4881 29.7189 27.1175 27.6996 28.6749C25.6803 30.2323 22.8943 30.4889 19.9646 29.5501C17.0373 28.6122 14.0183 26.4913 11.627 23.3907C9.23566 20.2901 7.95146 16.8314 7.78797 13.7619C7.62435 10.6898 8.58032 8.06041 10.5996 6.50304C12.6189 4.94567 15.4049 4.6891 18.3346 5.62784C21.2619 6.5658 24.2809 8.6866 26.6722 11.7872Z' fill='white' stroke='%2318325B'/%3E%3C/svg%3E");
    }

    @include phone {
      top: 20px;
      width: 237px;
      height: 64px;
    }
  }
}

.main-price__blocks {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 40px;
  max-width: 648px;
  width: 100%;
  margin: 50px auto 0;

  @include phone {
    margin: 16px auto 0;
    grid-row-gap: 16px;
  }
}

</style>
