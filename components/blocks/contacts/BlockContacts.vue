<template>
  <section class="block-contacts" :id="data.id">
    <div class="block-contacts__inner">
      <div class="block-contacts__info">
        <h2 class="block-contacts__title page__title" v-html="data.title"></h2>
        <div class="block-contacts__contacts">
          <div class="block-contacts__contacts-item">
            <base-svg icon="phone"/>
            <a :href="`tel:${data.phone}`" v-html="data.phone"></a>
          </div>
          <div class="block-contacts__contacts-item">
            <base-svg icon="mail"/>
            <a :href="`mailto:${data.email}`" v-html="data.email"></a>
          </div>
          <div class="block-contacts__contacts-item">
            <base-svg icon="tg-flat"/>
            <a :href="data.socials[0].link" target="_blank" v-html="data.socials[0].name"></a>
          </div>
          <div class="block-contacts__contacts-item">
            <base-svg icon="pin"/>
            <a :href="data.address.link" target="_blank" v-html="data.address.name"></a>
          </div>
        </div>
        <div class="block-contacts__button hidden-sm">
          <base-button theme="blue" @click="$modal.show('application-modal')">
            {{ data.button }}
          </base-button>
        </div>
      </div>
    </div>
    <div class="contacts-page__map">
      <BaseMap :data="data.address"/>
    </div>
    <div class="block-contacts__button visible-sm">
      <base-button theme="blue" @click="$modal.show('application-modal')">
        {{ data.button }}
      </base-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins, Prop} from "nuxt-property-decorator"
import PathMixin from "~/mixins/path";
import {ContactsElement} from "~/models/contacts";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
    BaseMap: () => import('~/components/base/map/BaseMap.vue'),
  },
})
export default class BlockContacts extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: ContactsElement
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.block-contacts {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 45%;
  grid-gap: 190px;
  background-color: $green;

  @include tablet {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
}

.contacts-page__map {
  height: 100%;
  min-height: 616px;

  @include tablet {
    height: 300px;
    min-height: unset;
  }
}

.block-contacts__inner {
  display: flex;
  padding: 50px 0 70px;

  @include tablet {
    width: 100%;
    padding: 40px;
  }

  @include tablet {
    padding: 30px;
  }
}

.block-contacts__info {
  width: 100%;
  max-width: 550px;
  margin-left: auto;
  padding-left: 100px;

  @include tablet {
    margin-left: unset;
    padding-left: 0;
    max-width: unset;
  }
}

.block-contacts__title {
  @include tablet {
    text-align: center;
  }
}

.block-contacts__contacts {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 26px;
  margin: 60px 0;

  @include tablet {
    margin: 30px 0 0;
    grid-row-gap: 26px;
  }

  @include phone {
    margin: 18px 0 0;
    grid-row-gap: 18px;
  }
}

.block-contacts__contacts-item {
  display: grid;
  grid-template-columns: 37px 1fr;
  grid-gap: 20px;
  align-items: center;
  width: fit-content;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  transition: $base-transition;

  @include hover {
    color: $blue;
  }

  svg {
    display: block;
    width: 37px;
    height: 37px;
  }

  @include phone {
    font-size: 14px;
    grid-template-columns: 18px 1fr;
    grid-gap: 10px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}

.block-contacts__button {
  display: flex;
  justify-content: center;

  .button {
    width: fit-content;
  }

  @include tablet {
    padding: 40px;
  }

  @include phone {
    padding: 30px;
  }
}

</style>
