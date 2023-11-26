<template>
  <ValidationProvider
    v-slot="{ errors }"
    :class="['base-form-checkbox', {'base-form-checkbox--inverted': inverted}]"
    :name="schema.as ? schema.as : schema.name"
    mode="passive"
    :rules="{ required: { allowFalse: false } }"
    tag="div"
  >
    <label class="base-form-checkbox__control">
      <input
        :id="schema.name"
        v-model="checked"
        :ref="schema.ref ?schema.ref:'input'"
        :name="schema.name"
        class="visually-hidden"
        type="checkbox"
      >
      <span
        :class="[
                    'base-form-checkbox__text',
                    { error: errors.length > 0 },
                  ]"
      >
        <span v-html="schema.label"></span>
      </span>
    </label>
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from "nuxt-property-decorator"
// noinspection ES6PreferShortImport
import {DynamicValidationProvider} from '../../../components/plugins/validation-provider'

@Component({
  components: {
    ValidationProvider: DynamicValidationProvider,
  }
})
export default class BaseFormCheckbox extends Vue {
  @Prop({required: true})
  value!: boolean

  @Prop({required: true})
  schema!: any

  @Prop({default: false})
  inverted!: boolean

  get checked() {
    return this.value
  }

  set checked(value: boolean) {
    this.$emit('input', value)
  }
}
</script>


<style lang="scss">
@import "../../../assets/scss/helpers/variables";
@import "../../../assets/scss/helpers/mixins";

.base-form-checkbox {
display: block;

  input:checked + .base-form-checkbox__text::before {
    background-color: $white;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_885_70677)'%3E%3Cpath d='M19 3.88226H5C3.9 3.88226 3 4.78226 3 5.88226V19.8823C3 20.9823 3.9 21.8823 5 21.8823H19C20.1 21.8823 21 20.9823 21 19.8823V5.88226C21 4.78226 20.1 3.88226 19 3.88226ZM10.71 17.1723C10.32 17.5623 9.69 17.5623 9.3 17.1723L5.71 13.5823C5.32 13.1923 5.32 12.5623 5.71 12.1723C6.1 11.7823 6.73 11.7823 7.12 12.1723L10 15.0523L16.88 8.17226C17.27 7.78226 17.9 7.78226 18.29 8.17226C18.68 8.56226 18.68 9.19226 18.29 9.58226L10.71 17.1723V17.1723Z' fill='%236D97FF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_885_70677'%3E%3Crect width='24' height='24' fill='white' transform='translate(0 0.882263)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  }

  input:disabled +.base-form-checkbox__text::before {
    background-color: #D3D3D3;
    border-color: #DCDCDC;
  }

  &:hover {
    .base-form-checkbox__text::before {
      //border-color: $base-brand-color;
    }
  }

  &--inverted {
    .base-form-checkbox__text::before {

    }

    .base-form-checkbox__text {
      color: $black;

      a:not(:hover) {

      }
    }
  }
}

.base-form-checkbox__text {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;

  @media #{$tablet} {
    font-size: 16px;
    line-height: 22px;
  }

  a {
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    @include base-link;

    @media #{$tablet} {
      font-size: 16px;
      line-height: 22px;
    }
  }

  &::before {
    content: "";
    display: block;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_168_15085)'%3E%3Cpath d='M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z' fill='%238790AE' fill-opacity='0.4'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_168_15085'%3E%3Crect width='24' height='24' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }

  &.error {
    &::before {
      border-color: $blue;
    }
  }
}

</style>
