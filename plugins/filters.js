import Vue from 'vue'

Vue.filter('striphtml', function(value) {
  const div = document.createElement('div')
  div.innerHTML = value
  const text = div.textContent || div.innerText || ''
  return text
})

Vue.filter('excerpt', function(value, arg1) {
  return (
    value
      .split(/\s+/)
      .slice(0, arg1)
      .join(' ') + '...'
  )
})
