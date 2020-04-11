var datain = localStorage.getItem('bookedData')
var dataObj = JSON.parse(datain)
console.log(dataObj)
if(dataObj==null){
    var container=document.getElementById('container')
    container.style.color='red'
    container.setAttribute('class','text-center h3 m-5')
    container.innerHTML='NO BOOKINGS'

    var backButton=document.createElement('button')
    backButton.setAttribute('class','btn btn-primary m-5')
    backButton.textContent='Go to Home'
    backButton.addEventListener('click',goback)
    container.appendChild(backButton)
    function goback(){
        location.href='Homepage.html'
    }
}
else{
    var container=document.getElementById('container')
    var topDiv=document.createElement('div')
    topDiv.setAttribute('class','bg-secondary rounded text-center p-4')
    container.appendChild(topDiv)

    //show details
    var movieName= document.createElement('div')
    movieName.textContent=dataObj.movieName
    topDiv.appendChild(movieName)

    var show= document.createElement('div')
    show.textContent=dataObj.show
    topDiv.appendChild(show)

    var languagesSelected= document.createElement('div')
    languagesSelected.textContent=dataObj.languagesSelected
    topDiv.appendChild(languagesSelected)

    var div1=document.createElement('div')
    div1.setAttribute('class','d-flex justify-content-center')
    topDiv.appendChild(div1)

    var seatsbooked=document.createElement('div')
    seatsbooked.textContent='Seats Booked :'
    div1.appendChild(seatsbooked)
    for(let i=0;i<dataObj.seatsSelected.length;i++){
        let seatNumber=document.createElement('div')
        seatNumber.setAttribute('class','mx-1')
        seatNumber.textContent=dataObj.seatsSelected[i]
        div1.appendChild(seatNumber)
    }

    var div2=document.createElement('div')
    div2.setAttribute('class','d-flex justify-content-center')
    topDiv.appendChild(div2)
    var total=document.createElement('div')
    var price=document.createElement('div')
    total.textContent="Total Price :"
    price.setAttribute('class','mx-1')
    price.textContent=dataObj.totalPrice
    div2.appendChild(total)
    div2.appendChild(price)

    //cancellation button
    var button=document.createElement('button')
    button.setAttribute('class','btn btn-primary my-4')
    button.textContent="Cancel Booking"
    button.addEventListener('click',cancelBooking)
    topDiv.appendChild(button)
}

function cancelBooking(){
    localStorage.removeItem('bookedData')
    location.reload()
}