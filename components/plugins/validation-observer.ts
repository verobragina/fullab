import {AsyncComponent} from 'vue/types/options'

// @ts-ignore
export const DynamicValidationObserver: AsyncComponent = () => {
  return new Promise((resolve) => {
    import('vee-validate').then(({ ValidationObserver }) => {
      resolve(ValidationObserver)
    })
  })
}
