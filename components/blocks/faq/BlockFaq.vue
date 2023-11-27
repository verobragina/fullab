<template>
  <section class="block-faq" :id="data.id" v-if="data">
    <div class="container container--md">
      <div class="block-faq__inner">
        <h2 class="page__title page__title--centered" v-html="data.title"></h2>
        <ul class="block-faq__list">
          <li class="block-faq__list-item" v-for="item in data.list">
            <base-collapse :item="item" :initial-open="false"/>
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
    BaseCollapse: () => import('~/components/base/collapse/BaseCollapse.vue'),
  },
})
export default class BlockFaq extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.block-faq {
  position: relative;
  padding: 113px 0 0;

  @include tablet {
    padding: 70px 0;
  }

  @include phone {
    padding: 30px 0;
  }
}

.block-faq__inner {

}

.block-faq__list {
  @include list-reset;
  margin-top: 80px;

  @include phone {
    margin-top: 20px;
  }
}

.block-faq__list-item {
  padding: 50px 0;
  border-bottom: 2px dashed $green;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  ::v-deep .base-collapse {
    padding: 0 114px;
  }

  @include tablet {
    ::v-deep .base-collapse {
      padding: 0 70px;
    }
  }

  @include phone {
    padding: 15px 0;

    ::v-deep .base-collapse {
      padding: 0;
    }
  }
}

</style>
