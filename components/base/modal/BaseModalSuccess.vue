<template>
  <modal
    :name="name"
    class="success-modal"
    height="auto"
    :max-width="width"
    :adaptive="true"
    :scrollable="false"
    :resizable="false"
    width="90%"
  >
    <div class="success-modal__inner">
      <button class="success-modal__close" @click="closeModal">
        <base-svg class="success-modal__close-svg" icon="close" />
      </button>
      <base-svg class="success-modal__icon" :icon="icon"/>
      <p class="success-modal__title" v-html="title"></p>
    </div>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins, Prop} from 'nuxt-property-decorator'
import DetectorMixin from "~/mixins/detector"

@Component({
  components: {
    BaseSvg: () => import('../svg/BaseSvg.vue'),
    BaseButton: () => import('../button/BaseButton.vue'),
  },
})
export default class BaseModalSuccess extends mixins(DetectorMixin, Vue) {
  @Prop({default: 'success'})
  icon!: string

  @Prop()
  name!: string

  @Prop()
  title!: string

  get width() {
    if (this.isMobile) {
      return 564
    }
    return 480
  }

  get height() {
    if (this.isMobile) {
      return '100%'
    }
    return 'auto'
  }

  closeModal () {
    this.$modal.hide(this.name)
  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/variables";
@import "../../../assets/scss/helpers/mixins";

.success-modal {

  ::v-deep .vm--modal {
    background: #373737;
    border-radius: 12px;

    @media #{$tablet} {

    }
  }

  ::v-deep .vm--overlay {
    background: linear-gradient(180deg, rgba(41, 39, 39, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%);
    backdrop-filter: blur(10px);
  }
}

.success-modal__close {
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: auto;
  border: 0;
  background: transparent;
  color: $white;
}

.success-modal__close-svg {
  display: block;
  width: 24px;
  height: 24px;
}

.success-modal__inner {
  padding: 50px 32px 40px;

  @media #{$phone} {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 35px 13px 20px;
  }
}

.success-modal__content {
  width: 100%;
}

.success-modal__form-wrap {
  max-width: 550px;
  margin: 0 auto;
}

.success-modal__title {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;

  @media #{$phone} {
    font-size: 16px;
  }
}

.success-modal__icon {
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;

  @media #{$phone} {
    width: 32px;
    height: 32px;
    margin: 0 auto 12px;
  }
}


</style>
