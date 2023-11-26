<template>
  <header class="page__header header" v-if="$store.state.base">
    <div class="container">
      <div class="header__top">
        <base-link to="/" class="header__logo">
          <base-svg icon="logo"/>
        </base-link>
        <nav class="header__nav hidden-sm">
          <ul class="header__nav-list">
            <li class="header__nav-item">
              <a class="header__phone" :href="`tel:${$store.state.base.phone}`" v-html="$store.state.base.phone"/>
            </li>
            <li class="header__nav-item" v-for="item in $store.state.base.menu">
              <nuxt-link class="header__nav-link" :to="item.link" v-html="item.name"></nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="header__menu visible-sm">
          <a class="header__phone" :href="`tel:${$store.state.base.phone}`" v-html="$store.state.base.phone"/>
          <button class="header__burger" type="button" @click="$modal.show('menu-modal')">
            <base-svg icon="burger"/>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "nuxt-property-decorator";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
    LayoutBaseMenu: () => import('~/components/layout/base/LayoutBaseMenu.vue'),
  },
})
export default class LayoutBaseHeader extends Vue {
  isMenuActive: boolean = false
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.header {
  position: relative;
  z-index: 10;
  background: $color-background-primary;
}

.header__top {
  display: grid;
  grid-template-columns: 210px 1fr;
  grid-column-gap: $grid-column-gap;
  align-items: center;
  padding: 44px 0 12px;

  @include tablet {
    align-items: center;
  }

  @media #{$phone} {
    padding: 30px 0 20px;
    grid-template-columns: 111px 1fr;
  }
}

.header__logo {
  display: block;
  width: 210px;
  height: 66px;

  svg {
    width: 100%;
    height: 100%;
  }

  @include tablet {
    width: 180px;
  }

  @include phone {
    width: 111px;
    height: 35px;
  }
}

.header__menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header__nav-list {
  @include list-reset;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.header__nav-link {
  font-family: $font-family-secondary;
  font-weight: 600;
  font-size: 20px;
  line-height: normal;
  text-transform: uppercase;
  transition: $base-transition;

  @include hover {
    color: $blue;
  }
}

.header__phone {
  font-family: $font-family-secondary;
  font-weight: 700;
  font-size: 24px;
  line-height: normal;
  text-transform: uppercase;
  transition: $base-transition;

  @include hover {
    color: $blue;
  }

  @include tablet {
    margin-bottom: 5px;
  }

  @include phone {
    font-size: 12px;
    margin-bottom: 0;
  }
}

.header__burger {
  @include button-reset;
  width: 26px;
  height: 25px;

  svg {
    width: 100%;
    height: 100%;
  }
}

</style>
