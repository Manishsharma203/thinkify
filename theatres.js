var datain = localStorage.getItem('showdata')
var dataObj = JSON.parse(datain)

firstrowSeats=['F101','F102','F103','F104','F105','F106','F107','F108','F109']
secondrowSeats=['F201','F202','F203','F204','F205','F206','F207','F208','F209','F210','F211','F212']

if (dataObj == null) {
    var container=document.getElementById('container')
    container.style.color='red'
    container.setAttribute('class','text-center h3 m-5')
    container.innerHTML='NO DATA'
}
else {
    document.getElementById('movieName').innerHTML = dataObj.name
    document.getElementById('show').innerHTML = 'Show : ' + dataObj.show
    var languageDropdown = document.getElementById('languageDropdown')
    for (let i = 0; i < dataObj.languages.length; i++) {
        let languages = document.createElement('option')
        languages.textContent = dataObj.languages[i]
        languages.setAttribute('value', dataObj.languages[i])
        languageDropdown.appendChild(languages)
    }


    var languagesSelected = ''
    languageDropdown.addEventListener('change', selectLang)

    //creating seats accoridng to language selected
    function selectLang() {
        languagesSelected = languageDropdown.value
        if (languagesSelected != '') {
            var seatContainer = document.getElementById('seatContainer')
            while (seatContainer.firstChild) {
                seatContainer.removeChild(seatContainer.firstChild);
            }
            var selectSeats=document.createElement('div')
            selectSeats.innerHTML='Select your seats:'
            selectSeats.setAttribute('class','m-3 h3')
            seatContainer.appendChild(selectSeats)
            // creating seats
            var firstrow = document.createElement('div')
            firstrow.setAttribute('class', 'col-7 mx-auto d-flex flex-wrap')
            seatContainer.appendChild(firstrow)
            var secondrow = document.createElement('div')
            secondrow.setAttribute('class', 'col-9 mx-auto d-flex flex-wrap')
            seatContainer.appendChild(secondrow)

            for (let i = 0; i < firstrowSeats.length; i++) {
                let seat = document.createElement('div')
                seat.style.width = '50px'
                seat.style.height = '50px'
                seat.setAttribute('class', 'bg-danger m-2')
                seat.textContent=firstrowSeats[i]
                seat.addEventListener('click',addSeat)
                firstrow.appendChild(seat)
            }
            for (let i = 0; i < secondrowSeats.length; i++) {
                let seat = document.createElement('div')
                seat.style.width = '50px'
                seat.style.height = '50px'
                seat.setAttribute('class', 'bg-danger m-2')
                seat.textContent=secondrowSeats[i]
                seat.addEventListener('click',addSeat)
                secondrow.appendChild(seat)
            }
        //creating confirmation button
        var button=document.createElement('button')
        button.setAttribute('class','btn btn-success border-dark offset-5 my-4')
        button.textContent='CONFIRM BOOKING'
        button.addEventListener('click',confirmation)
        seatContainer.appendChild(button)
        }
    }
    var seatsSelected=[]
    //adding seats function
    function addSeat(event){
        seatsSelected.push(event.target.innerHTML)
        event.target.setAttribute('class','bg-secondary m-2')
    }
    //confirm button function
    function confirmation(){
        var bookedData={
            movieName:dataObj.name,
            show:dataObj.show,
            languagesSelected:languagesSelected,
            seatsSelected:seatsSelected,
            totalPrice:(seatsSelected.length*dataObj.price)
        }
        if(seatsSelected.length>0){
            var dataOut = JSON.stringify(bookedData)
            localStorage.setItem('bookedData', dataOut)
            location.href='Bookings.html'
        }
        else{
            alert('please select seats')
        }
    }

}