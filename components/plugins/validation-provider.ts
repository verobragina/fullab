import {AsyncComponent} from 'vue/types/options'

// @ts-ignore
export const DynamicValidationProvider: AsyncComponent = () => {
  return new Promise((resolve) => {
    // @ts-ignore
    import('../../components/plugins/validation-rules')
      .then(() => {
        import('vee-validate')
          .then(({ ValidationProvider }) => {
            resolve(ValidationProvider)
          })
      })
  })
}
