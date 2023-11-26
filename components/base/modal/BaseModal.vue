<template>
  <modal
      :name="name"
      class="base-modal"
      :class="modalClasses"
      :height="isFull ? '100%' : 'auto'"
      :max-width="width"
      :adaptive="true"
      :scrollable="false"
      :resizable="false"
      :width="isFull ? '100%' : '90%'"
  >
    <div class="base-modal__inner">
      <button class="base-modal__close" @click="closeModal">
        <base-svg class="base-modal__close-svg" icon="close"/>
      </button>
      <p class="base-modal__title" v-html="title" v-if="title"></p>
      <slot></slot>
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
export default class BaseModal extends mixins(DetectorMixin, Vue) {
  @Prop()
  name!: string

  @Prop()
  title?: string | any

  @Prop({validator: (value: string) => ['small'].includes(value)})
  size?: string

  @Prop()
  isFull?: boolean

  get modalClasses() {
    return {
      [`base-modal--${this.size}`]: this.size,
      'base-modal--full': this.isFull,
    }
  }

  get width() {
    if (this.isFull) {
      return 1920
    }

    if (this.size === 'small') {
      return 172
    }

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

  closeModal() {
    this.$modal.hide(this.name)
  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/variables";
@import "../../../assets/scss/helpers/mixins";

.base-modal {
  ::v-deep .vm--modal {
    background: $white;
    border-radius: 0;
  }

  ::v-deep .vm--overlay {
    background: rgba(#A0DEC4, .8);
    backdrop-filter: blur(10px);
  }

  &--full {
    ::v-deep .vm--modal {
      background: transparent;
      border-radius: 0;
    }

    .base-modal__inner {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
}

.base-modal__close {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: auto;
  border: 0;
  background: transparent;
}

.base-modal__close-svg {
  display: block;
  width: 24px;
  height: 24px;
}

.base-modal__inner {
  padding: 16px 30px 24px;
}

.base-modal__content {
  width: 100%;
}

.base-modal__form-wrap {
  max-width: 550px;
  margin: 0 auto;
}

.base-modal__title {
  font-family: $font-family-secondary;
  font-weight: 600;
  font-size: 48px;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;

  @include phone {
    font-size: 30px;
  }
}

.base-modal__icon {
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
}


</style>
