export default async function ({ store, redirect }) {
  if (!store.$auth.$state.loggedIn) {
    await store.$auth.loginWith('laravel.passport')
    await store.$auth.fetchUser()
  } else {
    if (store.$auth.$state.user.email_verified_at === null) {
      redirect('https://auth.nknx.org/email/verify')
    }
  }
}
