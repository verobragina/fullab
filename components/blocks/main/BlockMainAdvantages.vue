<template>
  <section class="main-advantages" :id="data.id" v-if="data">
    <div class="container">
      <div class="main-advantages__inner">
        <h2 class="page__title page__title--centered" v-html="data.title"></h2>
        <div class="main-advantages__block">
          <ul class="main-advantages__list">
            <li class="main-advantages__list-item" v-for="item in data.leftList">
              <base-svg icon="cross" />
              <span v-html="item"></span>
            </li>
          </ul>
          <ul class="main-advantages__list" >
            <li class="main-advantages__list-item" v-for="item in data.rightList">
              <base-svg icon="check" />
              <span v-html="item"></span>
            </li>
          </ul>
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
  },
})
export default class BlockMainAction extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.main-advantages {
  position: relative;
  padding: 70px 0;

  @include phone {
    padding: 30px 0;
  }
}

.main-advantages__inner {
  padding: 0 100px;

  @include tablet {
    padding: 0;
  }
}

.main-advantages__block {
  display: grid;
  grid-template-columns: 55% 45%;
  grid-column-gap: 70px;
  margin-top: 70px;

  @include tablet {
    grid-template-columns: 1fr;
    grid-row-gap: 30px;
    margin-top: 40px;
  }

  @include phone {
    margin-top: 20px;
  }
}

.main-advantages__list {
  @include list-reset;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 25px;
  align-items: center;

  @include phone {
    grid-row-gap: 16px;
  }
}

.main-advantages__list-item {
  display: grid;
  grid-template-columns: 45px 1fr;
  grid-column-gap: 16px;
  align-items: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  svg {
    width: 45px;
    height: 45px;
  }

  @include tablet {
    font-size: 24px;
  }

  @include phone {
    grid-template-columns: 24px 1fr;
    grid-column-gap: 9px;
    font-size: 14px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

</style>
