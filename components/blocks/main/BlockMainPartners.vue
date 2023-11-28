<template>
  <section class="main-partners" v-if="data">
    <div class="container">
      <div class="main-partners__inner">
        <div class="main-partners__info">
          <div class="main-partners__text" v-html="data.text"></div>
          <div class="main-partners__controls">
            <div class="main-promo__button visible-sm">
              <base-button theme="green" @click="$modal.show('application-modal')">
                {{ data.button }}
              </base-button>
            </div>
            <nuxt-link class="main-partners__link" :to="data.link">
              <span>{{ data.linkName }}</span>
              <base-svg icon="arrow-right"/>
            </nuxt-link>
          </div>
        </div>
        <ul class="main-partners__list hidden-sm">
          <li class="main-partners__list-item" v-for="item in partners">
            <a :href="item.link" target="_blank" class="main-partners__list-link">
              <img :src="item.picture" :alt="item.name">
              <base-svg :icon="item.code" v-if="false"/>
            </a>
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
  },
})
export default class BlockMainPartners extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any

  partners: Array<any> = [
    {picture: '/assets/images/partners/ym.png', name: 'ym', code: 'ym', link: "https://market.yandex.ru/"},
    {picture: '/assets/images/partners/wb.png', name: 'wb', code: 'wb', link: "https://www.wildberries.ru/"},
    {picture: '/assets/images/partners/ozon.png', name: 'ozon', code: 'ozon', link: "https://www.ozon.ru/"},
    {picture: '/assets/images/partners/sm.png', name: 'sm', code: 'sm', link: "https://sbermarket.ru/"},
    {picture: '/assets/images/partners/pinduo.png', name: 'pinduo', code: 'pinduo', link: "https://m.pinduoduo.com/"},
    {picture: '/assets/images/partners/alibaba.png', name: 'alibaba', code: 'alibaba', link: "https://www.alibaba.com/"},
    {picture: '/assets/images/partners/taobao.png', name: 'taobao', code: 'taobao', link: "https://world.taobao.com/"},
    {picture: '/assets/images/partners/poizon.png', name: 'poizon', code: 'poizon', link: "https://www.poizon.com/"},
  ]
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.main-partners {
  position: relative;
  padding: 77px 0;
  background-color: $blue;

  @include tablet {
    padding: 35px 0;
  }
}

.main-partners__inner {
  display: grid;
  grid-template-columns: 1fr 418px;
  grid-column-gap: 32px;

  @include tablet {
    grid-template-columns: 1fr;
  }

  @include phone {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }
}

.main-partners__info {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include tablet {
    align-items: unset;
  }
}

.main-partners__text {
  font-size: 31px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.31px;
  color: $white;

  @include tablet {
    font-size: 24px;
  }

  @include phone {
    font-size: 14px;
  }

  ::v-deep p + p {
    margin-top: 8px;
  }
}

.main-partners__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: $font-family-secondary;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  color: $white;
  transition: $base-transition;

  svg {
    width: 93px;
    height: 18px;
    margin-top: 5px;
    color: $white;
    transition: $base-transition;
    flex-shrink: 0;

    @include phone {
      width: 20px;
      height: 6px;
    }
  }

  @include hover {
    color: $green;

    svg {
      color: $green;
      transform: translateX(5px);
    }
  }

  @include tablet {
    font-size: 28px;
    gap: 5px;
  }

  @include phone {
    font-size: 16px;
  }
}

.main-partners__button {
  display: flex;
  justify-content: center;

  .button {
    width: fit-content;
  }
}

.main-partners__controls {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 43px;

  @include tablet {
    justify-content: unset;
    align-items: center;
    gap: 19px;
    margin-top: 24px;
  }
}

.main-partners__list {
  @include list-reset;
  display: grid;
  grid-template-columns: repeat(4, 72px);
  grid-gap: 40px;
}

.main-partners__list-link {
  display: block;
  width: 72px;
  height: 72px;
  transition: $base-transition;

  @include hover {
    transform: translateY(-5px);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

</style>
