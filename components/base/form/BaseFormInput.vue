<template>
  <ValidationProvider class="base-input-component" :name="schema.as ? schema.as : schema.name" mode="passive" tag="div"
                      :rules="schema.validateRules"
                      v-slot="{ errors }">
    <div class="base-input" :class="classes(errors.length > 0)">
      <div class="base-input__wrap">
        <label :for="schema.name" :class="['base-input__label', {'active': isFocus}]" v-if="schema.label">
          {{ schema.label }}
        </label>
        <input
            :class="['base-input__control', {'active': isFocus}]"
            :id="schema.name"
            v-model.trim="inputValue"
            :placeholder="schema.placeholder ? schema.placeholder : ''"
            :ref="schema.ref ?schema.ref:'input'"
            :name="schema.name"
            :autocomplete="schema.autocomplete"
            v-mask="{
            mask: schema.mask,
            showMaskOnHover: false,
            showMaskOnFocus: true
          }"
            :readonly="disabled"
            :type="typeChange ? 'text' : schema.type"
            @focus="handleFocus" @blur="handleBlur"
            :data-vv-as="schema.validateRules.confirmed"
        />

        <button class="base-input__show-pas" type="button" v-if="schema.type === 'password'"
                @click="typeChange = !typeChange">
          <base-svg icon="eye" v-if="typeChange"/>
          <base-svg icon="close-eye" v-else/>
        </button>

      </div>
      <div class="base-input__error" v-if="errors.length > 0">&nbsp;{{ errors[0] }}</div>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
// noinspection ES6PreferShortImport
import {DynamicValidationProvider} from '../../../components/plugins/validation-provider'
import Vue from "vue";
import {Component, Prop} from "nuxt-property-decorator";

// @ts-ignore
@Component({
  components: {
    BaseSvg: () => import('../../../components/base/svg/BaseSvg.vue'),
    ValidationProvider: DynamicValidationProvider,
  }
})
export default class BaseFormInput extends Vue {
  @Prop({required: true})
  value!: string

  @Prop({default: false})
  formatted!: boolean

  @Prop({required: true})
  schema!: any

  @Prop({default: false})
  disabled!: boolean

  @Prop({default: false})
  inverted!: boolean

  isFocus = false

  typeChange = false

  get isEmpty() {
    return !this.inputValue
  }

  get inputValue() {
    return this.value
  }

  set inputValue(value) {
    this.$emit('input', value)
  }

  handleFocus() {
    this.$emit('focus')
    this.isFocus = true
  }

  handleBlur() {
    if (this.isEmpty) {
      this.isFocus = false
    }
    this.$emit('blur')
  }

  classes(isError: boolean) {
    return {
      'is_status-focus': this.isFocus || !this.isEmpty,
      'is_status-error': isError,
      'is_status-valid': !this.isEmpty && !isError,
      'base-input--inverted': this.inverted,
      // 'is_status-disabled': this.isDisabled,
      'base-input--password': this.schema.type === 'password',
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.base-input-component {
  flex-grow: 1;
}

.base-input {
  position: relative;
  width: 100%;


  &.is_status-error {
    .base-input__control {
      border: 1px solid $red;
    }
  }

  &--password {
    .base-input__control {
      display: block;
      width: 100%;
      padding: 26px 16px 4px 50px;
    }

    .base-input__label {
      left: 50px;
    }
  }
}

.base-input__wrap {
  position: relative;
}

.base-input__control {
  display: block;
  width: 100%;
  padding: 12px 20px;
  background: $white;
  border: 1px solid $green;
  border-radius: 0;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 20px;
  line-height: normal;
  color: $dark-blue;

  &.active {
    //border: 1px solid $blue;
  }

  @include hover {
    &::placeholder {
      color: $dark-blue
    }
  }

  @include phone {
    font-size: 12px;
    padding: 6px 7px;
  }

  &::placeholder {
    color: rgba(24, 50, 91, 0.50);
    font-weight: 300;
    font-style: italic;
    transition: $base-transition;
  }
}

.base-input__label {
  display: block;
  margin-bottom: 14px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #99999A;
  cursor: text;
}

.base-input__mark {
  position: absolute;
  right: 16px;
  bottom: 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}

.base-input__error {
  display: block;
  margin-top: 8px;
  color: $red;
  font-weight: 300;
  font-size: 14px;
  line-height: 120%;
}

.base-input__show-pas {
  position: absolute;
  top: 19px;
  left: 16px;
  z-index: 2;
  padding: 0;
  background: transparent;
  border: 0;

  svg {
    display: block;
    width: 20px;
    height: 20px;
  }
}

</style>
