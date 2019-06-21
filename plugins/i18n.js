export default function({ app }) {
  if (app.i18n.locale == 'zh') {
    app.$moment.locale('zh-cn')
  } else {
    app.$moment.locale(app.i18n.locale)
  }

  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    if (newLocale == 'zh') {
      app.$moment.locale('zh-cn')
    } else {
      app.$moment.locale(newLocale)
    }
  }
}
