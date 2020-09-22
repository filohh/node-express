console.log('My javascript');

const weatherForm = document.getElementById('searchForm')
const searchElement = document.querySelector('input')

const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

async function getLocationData(location) {
  let response = await fetch (`/weather?address=${location}`)
  let data = await response.json()
  messageOne.textContent = data.Location
  messageTwo.textContent = data.Forecast
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault() 
  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''
  const location = searchElement.value
 
  getLocationData(location)
})
  