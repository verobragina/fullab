<template>
  <div class="base-select">
    <v-select :options="options"
              class="base-select__select"
              v-model.trim="inputValue"
              :reduce="item => item.id" label="name"
              :placeholder="schema.placeholder ? schema.placeholder : ''"
              :ref="schema.ref ?schema.ref:'select'"
              :name="schema.name"
              :clearable="false"
              :searchable="searchable"
              :disabled="disabled"
    >
      <template #no-options="{ search, searching, loading }">&nbsp;</template>
    </v-select>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "nuxt-property-decorator";

@Component
export default class BaseFormSelect extends Vue {
  @Prop({required: true})
  value!: string

  @Prop({required: true})
  schema!: any

  @Prop({required: true})
  options?: any

  @Prop({default: false})
  disabled?: boolean

  @Prop({default: false})
  searchable?: boolean

  get inputValue() {
    return this.value
  }

  set inputValue(value) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";

.base-select {
  position: relative;
  width: 100%;
}

.base-select__select {
  ::v-deep .vs__dropdown-toggle {
    padding: 0;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 5px;
    border: 0;
    color: $white;
  }

  ::v-deep .vs__search {
    padding: 14px 16px;
    margin: 0;
    font-size: 16px;
    line-height: 120%;
    color: $white;

    @media #{$phone} {
      font-size: 14px;
    }

    &::placeholder {
      color: #979797;
    }
  }

  ::v-deep .vs__actions {
    padding-right: 14px;

    &::after {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    svg {
      display: none;
    }
  }

  &.vs--open {
    ::v-deep .vs__actions {
      &::after {
        transform: rotate(180deg);
      }
    }
  }

  ::v-deep .vs__dropdown-menu {
    position: static;
    display: grid;
    grid-row-gap: 12px;
    margin-top: 16px;
    padding: 15px 16px;
    max-height: 146px;
    background: #4B4B4B;
    border-radius: 6px;

    @media #{$phone} {
      margin-top: 12px;
    }

    &::-webkit-scrollbar {
      display: none;
      width: 0;
    }
  }

  ::v-deep .vs__selected {
    position: absolute;
    max-width: 100%;
    padding: 14px 16px;
    margin: 0;
    font-size: 16px;
    line-height: 120%;
    color: $white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media #{$phone} {
      font-size: 14px;
    }
  }

  ::v-deep .vs__dropdown-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    white-space: normal;
    transition: $base-transition;

    @media #{$phone} {
      font-size: 14px;
    }

    &::after {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_886_51457)'%3E%3Cpath d='M9.99984 1.66602C5.39984 1.66602 1.6665 5.39935 1.6665 9.99935C1.6665 14.5993 5.39984 18.3327 9.99984 18.3327C14.5998 18.3327 18.3332 14.5993 18.3332 9.99935C18.3332 5.39935 14.5998 1.66602 9.99984 1.66602ZM9.99984 16.666C6.3165 16.666 3.33317 13.6827 3.33317 9.99935C3.33317 6.31602 6.3165 3.33268 9.99984 3.33268C13.6832 3.33268 16.6665 6.31602 16.6665 9.99935C16.6665 13.6827 13.6832 16.666 9.99984 16.666Z' fill='%23B2875A'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_886_51457'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &--highlight {
      background-color: transparent;
      color: $blue;
    }

    &--selected {
      &::after {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_886_51362)'%3E%3Cpath d='M9.99984 1.91016C5.39984 1.91016 1.6665 5.64349 1.6665 10.2435C1.6665 14.8435 5.39984 18.5768 9.99984 18.5768C14.5998 18.5768 18.3332 14.8435 18.3332 10.2435C18.3332 5.64349 14.5998 1.91016 9.99984 1.91016ZM9.99984 16.9102C6.3165 16.9102 3.33317 13.9268 3.33317 10.2435C3.33317 6.56016 6.3165 3.57682 9.99984 3.57682C13.6832 3.57682 16.6665 6.56016 16.6665 10.2435C16.6665 13.9268 13.6832 16.9102 9.99984 16.9102Z' fill='%23B2875A'/%3E%3Cpath d='M10.0002 14.4115C12.3013 14.4115 14.1668 12.546 14.1668 10.2448C14.1668 7.94361 12.3013 6.07812 10.0002 6.07812C7.69898 6.07812 5.8335 7.94361 5.8335 10.2448C5.8335 12.546 7.69898 14.4115 10.0002 14.4115Z' fill='%23B2875A'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_886_51362'%3E%3Crect width='20' height='20' fill='white' transform='translate(0 0.244141)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
      }
    }
  }
}

</style>
