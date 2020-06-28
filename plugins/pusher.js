import Vue from 'vue'

Vue.use(require('vue-pusher'), {
  api_key: process.env.PUSHER_SECRET,
  options: {
    cluster: process.env.PUSHER_CLUSTER,
    forceTLS: true,
    wsHost: process.env.PUSHER_HOST,
    wssPort: process.env.PUSHER_PORT,
    wsPort: process.env.PUSHER_PORT
  }
})
