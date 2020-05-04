this.window.onload = () => {
  Array.from(this.document.getElementsByClassName('request')).forEach(element => {
    element.addEventListener('click', () => showRequestData(element))
  })
}

const showRequestData = (button) => {
  Array.from(this.document.getElementsByClassName('request')).forEach(element => {
    element.classList.remove('inactive')
  })
  button.classList.add('inactive')
  Array.from(this.document.getElementsByClassName('request-data')).forEach(element => {
    element.classList.add('hidden')
  })
  this.document.getElementById('request-data-' + button.value).classList.remove('hidden')
  console.log('button clicked')
}