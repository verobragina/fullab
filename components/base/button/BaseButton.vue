<template>
  <button
    v-if="!rawLink"
    class="base-button"
    :class="buttonClasses"
    :disabled="disabled"
    :type="buttonType"
    @click="$emit('click')"
  >
    <slot></slot>

  </button>
  <base-link
    v-else
    :to="rawLink"
    class="base-button"
    :class="buttonClasses"
    @click="onLinkClick($event)"
  >
    <slot></slot>
  </base-link>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "nuxt-property-decorator";
import BaseLink from "../link/BaseLink.vue";

@Component({
  components: {BaseLink}
})
export default class BaseButton extends Vue {
  @Prop({default: 'button'})
  buttonType!: string

  @Prop({default: false})
  disabled!: boolean

  @Prop({default: false})
  bordered!: boolean

  @Prop({validator: (value: string) => ['small', 'medium', 'large', 'full'].includes(value)})
  size?: string

  @Prop({validator: (value: string) => ['green', 'blue'].includes(value)})
  theme?: string

  @Prop()
  rawLink?: string

  @Prop({default: false})
  emitLinkClick!: boolean

  get buttonClasses() {
    return {
      [`base-button--${this.size}`]: this.size,
      [`base-button--${this.theme}`]: this.theme,
      'base-button--disabled': this.disabled,
      'base-button--bordered': this.bordered
    }
  }

  onLinkClick(event: Event) {
    if (this.emitLinkClick) {
      event.preventDefault()
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/helpers/variables";
@import "../../../assets/scss/helpers/mixins";

.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 22px 59px;
  font-family: $font-family-secondary;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  border: none;
  box-shadow: 2px 2px 0 0 $dark-blue;
  transition: color .2s ease-in-out;

  @include tablet {
    font-size: 28px;
  }

  @include phone {
    padding: 10px 16px;
    font-size: 16px;
  }

  &:active {
    box-shadow: 2px 2px 0 0 transparent;
  }

  &--medium {
    padding: 16px 30px;
    font-size: 28px;

    @include phone {
      padding: 10px 16px;
      font-size: 16px;
    }
  }

  &--green {
    background-color: $green;
    color: $dark-blue;

    @include hover {
      color: $white;
    }
  }

  &--blue {
    background-color: $blue;
    color: $white;

    @include hover {
      color: $dark-blue;
    }
  }
}
</style>
