export default function ({ $axios, redirect }) {

  const errorPath = '/404'

  $axios.onError(error => {
    console.log('error', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect(errorPath)
    }
  })
}
