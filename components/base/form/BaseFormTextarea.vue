<template>
  <ValidationProvider class="base-textarea-component" :name="schema.as ? schema.as : schema.name" mode="passive" tag="div"
                      :rules="schema.validateRules"
                      v-slot="{ errors }">
    <div class="base-textarea" :class="classes(errors.length > 0)">
      <label :for="schema.name" class="base-textarea__label" v-if="schema.label">
        {{ schema.label }}
        <span class="base-textarea__required" v-if="schema.validateRules.required">*</span>
      </label>
      <label class="visually-hidden" :for="schema.name" v-else>Введите значение {{ schema.placeholder }}</label>
      <div class="base-textarea__wrap">
        <textarea
               :class="['base-textarea__control', {'active': isFocus}]"
               :id="schema.name"
               v-model.trim="inputValue"
               :placeholder="schema.placeholder ? schema.placeholder : ''"
               :ref="schema.ref ? schema.ref : 'textarea'" :name="schema.name"
               :autocomplete="schema.autocomplete"
               :readonly="disabled" @focus="handleFocus" @blur="handleBlur"
        ></textarea>
      </div>
      <div class="base-textarea__error" v-if="errors.length > 0">&nbsp;{{ errors[0] }}</div>
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
export default class BaseFormTextarea extends Vue {
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

  @Prop()
  size?: string

  isFocus = false

  get isEmpty() {
    return !this.inputValue
  }

  get inputValue() {
    if (this.formatted) {
      return this.format(this.value)
    }

    return this.value
  }

  set inputValue(value) {
    if (this.formatted) {
      this.$emit('input', this.normalize(value))
    } else {
      this.$emit('input', value)
    }
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
      'base-textarea--inverted': this.inverted,
      'base-textarea--small': this.size  === 'small'
      // 'is_status-disabled': this.isDisabled,
    }
  }

  normalize(modifiedValue: string) {
    // Recalculate value after ignoring "$" and "," in user input
    let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""))
    // Ensure that it is not NaN
    if (isNaN(newValue)) {
      newValue = 0
    }

    return newValue;
  }

  format(value: string) {
    if (!value) {
      return '';
    }

    return parseFloat(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1 ");
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";

.base-textarea-component {
  flex-grow: 1;
}

.base-textarea {
  width: 100%;


  &.is_status-error {
    .base-textarea__control {
      border: 2px solid $red;
    }
  }
}

.base-textarea__wrap {
  position: relative;
}

.base-textarea__control {
  display: block;
  height: 112px;
  width: 100%;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent;
  border-radius: 6px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  resize: none;
  color: $blue;

  &.active {
    background: rgba(255, 255, 255, 0.06);
  }

  &::placeholder {
    color: $blue;
  }
}

.base-textarea__label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.02em;
}

.base-textarea__mark {
  position: absolute;
  right: 16px;
  bottom: 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}

.base-textarea__error {
  display: block;
  margin-top: 16px;
  color: $red;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
}

.base-textarea__required {
  color: $blue;
}
</style>
