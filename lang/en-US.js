import axios from 'axios'
export default () => {
  return new Promise(function(resolve) {
    axios
      .get(
        'https://raw.githubusercontent.com/CrackDavid/translationfiles/master/en.json'
      )
      .then(function(response) {
        resolve(response.data)
      })
  })
}
