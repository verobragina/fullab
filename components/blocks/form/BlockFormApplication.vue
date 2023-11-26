<template>
  <div class="application">
    <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="application-modal__form-wrap">
      <form class="application__form" @submit.prevent="handleSubmit(onSubmit)">
        <div class="application__form-group">
          <base-form-input v-model="formData.name" :schema="schema.name"/>
        </div>
        <div class="application__form-group">
          <base-form-input v-model="formData.phone" :schema="schema.phone"/>
        </div>
        <div class="application__form-group">
          <base-form-input v-model="formData.email" :schema="schema.email"/>
        </div>
        <div class="application__form-group">
          <base-form-input v-model="formData.comment" :schema="schema.comment"/>
        </div>
        <p v-if="error" class="application__error">{{ errorText }}</p>
        <div class="application__form-group application__form-button">
          <base-button size="medium" theme="blue" button-type="submit">Отправить заявку</base-button>
        </div>
        <div class="application__form-group">
          <a href="#" class="application__link">Политика конфиденциальности</a>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {DynamicValidationObserver} from '~/components/plugins/validation-observer'
import Vue from 'vue'
import {Component, mixins} from "nuxt-property-decorator"
import RecaptchaMixin from '~/mixins/recaptcha'
import {DynamicValidationProvider} from "~/components/plugins/validation-provider";

@Component({
  components: {
    ValidationObserver: DynamicValidationObserver,
    ValidationProvider: DynamicValidationProvider,
    BaseFormInput: () => import('../../base/form/BaseFormInput.vue'),
    BaseButton: () => import('../../base/button/BaseButton.vue'),
  },
})
export default class BlockFormApplication extends mixins(RecaptchaMixin, Vue) {
  success: boolean = false
  error: boolean = false
  errorText = ''

  schema = {
    name: {
      as: 'name',
      placeholder: 'Ваше имя',
      name: 'name',
      type: 'text',
      validateRules: {
        required: true,
      }
    },
    phone: {
      as: 'phone',
      placeholder: 'Телефон',
      name: 'phone',
      type: 'tel',
      mask: '+7 (999) 999-99-99',
      validateRules: {
        required: true,
        phone: true
      }
    },
    email: {
      as: 'email',
      placeholder: 'E-mail',
      name: 'email',
      type: 'email',
      mask: '',
      validateRules: {
        required: true,
        email: true,
      }
    },
    comment: {
      as: 'comment',
      placeholder: 'Коментарий',
      name: 'comment',
      type: 'text',
      validateRules: {
        required: false,
      }
    }
  }

  formData = {
    name: '',
    phone: '',
    email: '',
    comment: '',
  }

  async onSubmit() {
    const self = this;
    const token = await this.recaptchaToken()

    const formData = new FormData()

    formData.append('name', self.formData.name)
    formData.append('phone', `+${self.formData.phone.replace(/[^0-9]/g, '')}`)
    formData.append('email', self.formData.email)
    formData.append('comment', self.formData.comment)

    await this.$axios.$post(`/form.php`, formData).then(() => {
      self.success = true
      self.error = false
      self.clearData()
      self.$modal.hide('application-modal')
    }).catch((error) => {
      this.errorText = error.response.data.message ?? 'Не удалось отправить заявку'
      self.error = true
    })
  }

  clearData() {
    this.formData = {
      name: '',
      phone: '',
      email: '',
      comment: '',
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.application {

}

.application__text {
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;

  @media #{$phone} {
    max-width: 260px;
    margin: 0 auto 24px;
    text-align: center;
  }
}

.application__form {
  display: grid;
  grid-row-gap: 16px;
}

.application__form-group {
  display: grid;
}

.application__form-button {
  justify-items: center;

  ::v-deep button {
    width: fit-content;
  }
}

.application__link {
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-align: center;
  transition: $base-transition;

  @include hover {
    color: $blue;
  }

  @include phone {
    font-size: 12px;
  }
}

.application__error {
  font-weight: 300;
  color: $red;
  text-align: center;
}

</style>
