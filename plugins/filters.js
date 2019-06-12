import Vue from 'vue'

Vue.filter('commaNumber', function(x) {
  return x
    .toString()
    .replace(/(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d*)$/g, function(m, s1, s2) {
      return s2 || s1 + ','
    })
})

Vue.filter('nknValue', function(x) {
  return x / 100000000
})

Vue.filter('nodeVersion', function(x) {
  return x.toString().slice(0, 6)
})

Vue.filter('hexConverter', function(hex) {
  hex = hex.toString()
  let str = ''
  for (let i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  return str
})
