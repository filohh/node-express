console.log('My javascript');

const weatherForm = document.getElementById('searchForm')
const searchElement = document.querySelector('input')

const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

async function getLocationData(location) {
  let response = await fetch (`http://localhost:3000/weather?address=${location}`)
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
// fetch(`http://localhost:3000/weather?address=${location}`)
//   .then((response) => {
//      response.json().then((data) => {
//         if (data.error) {
//           console.log(data.error)
//           messageOne.textContent = data.error
//         } else {
//           messageOne.textContent = data.Location
//           messageTwo.textContent = data.Forecast
          
//         }
//       })
//    })
})
  