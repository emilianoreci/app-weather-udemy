const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const pronostico = document.querySelector('#pronostico')
const errorPronostico = document.querySelector('#errorPronostico')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorPronostico.innerText = ''
//pu
    if (searchInput.value.length === 0) alert('Debe ingresar una ciudad')
    else{
        pronostico.innerText='Loading ...'

        //la url para test de forma local usaria esto:
        //http://localhost:3000/weather?address=${searchInput.value}
        //pero como va a estar deployado en heroku se debe quitar:
        //http://localhost:3000
        const url = `/weather?address=${searchInput.value}`
        fetch(url)
        .then(response => response.json()) 
        .then(data => {
            if(data.error) {
                pronostico.innerText=''
                errorPronostico.innerText = data.error
                searchInput.style.border='red 2px solid'
            }
            else{
                searchInput.style.border=''
                console.log('------> ', data)
                //errorPronostico.innerText = ''
                pronostico.innerText=data.name +' '+ data.temp
            }
        }) 
    }
})
