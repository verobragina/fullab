export default async function ({ req, store, redirect, $cookies }) {
  try {
    if (req && req.url && req.url.startsWith('/personal')) {
      const hasBearer = $cookies.get('BEARER') !== undefined
      let response = await store.auth.getUser()
      const user = response.data.user
      if (user === null) {
        redirect(302, '/login')
      }
    }
  } catch (e) {
    console.log(e)
  }
}
