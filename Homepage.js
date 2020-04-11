var movieDatabase = [
    { "name": "RRR", "genre": "thriller", "languages": ['Hindi', 'English', 'Kannada'], "shows": [["Delhi", 400], ["Bengaluru", 450], ["Chandigarh", 250], ["Mumbai", 400], ["Kolkata", 300]] },
    { "name": "Bacchan Pandey", "genre": "action", "languages": ['Hindi'], "shows": [["Delhi", 400], ["Bengaluru", 450], ["Chandigarh", 250], ["Mumbai", 400]] },
    { "name": "Gunjan Saxena", "genre": "drama", "languages": ['Hindi'], "shows": [["Delhi", 400], ["Chandigarh", 250], ["Mumbai", 400]] },
    { "name": "Laxmi Bomb", "genre": "action", "languages": ['Hindi', 'English'], "shows": [["Delhi", 400], ["Chandigarh", 250], ["Mumbai", 400]] },
    { "name": "Out of Order", "genre": "thriller", "languages": ['English'], "shows": [["Delhi", 400], ["Bengaluru", 450], ["Mumbai", 400]] },
    { "name": "Soul", "genre": "drama", "languages": ['English'], "shows": [["Delhi", 400], ["Bengaluru", 450]] },
    { "name": "Ombatthane Dikku", "genre": "action", "languages": ['Hindi', 'Kannada'], "shows": [["Delhi", 400], ["Bengaluru", 450], ["Mumbai", 400]] },
    { "name": "Damayana", "genre": "thriller", "languages": ['Kannada'], "shows": [["Bengaluru", 450]] },
    { "name": "Black Widow", "genre": "action", "languages": ['Hindi', 'English', 'Kannada'], "shows": [["Delhi", 400], ["Bengaluru", 450], ["Chandigarh", 250], ["Mumbai", 400], ["Kolkata", 300]] },
    { "name": "Shabaash Mithu", "genre": "drama", "languages": ['Hindi', 'Kannada'], "shows": [["Delhi", 400], ["Bengaluru", 450], ["Mumbai", 400]] }
]
var database = movieDatabase

//filtering based on language
function languageFilter() {
    var languages = document.getElementById('languages')
    if (languages.value != "") {
        database = []
        for (let i = 0; i < movieDatabase.length; i++) {
            for (let j = 0; j < movieDatabase[i].languages.length; j++) {
                if (languages.value == movieDatabase[i].languages[j]) {
                    database.push(movieDatabase[i])
                    break
                }
            }
        }
    }
    else {
        database = movieDatabase
    }
    creatingCards()
}

// filtering based on genre
function genreFilter(){
    var genre = document.getElementById('genre')
    if (genre.value != "") {
        database = []
        for (let i = 0; i < movieDatabase.length; i++) {
            if(genre.value==movieDatabase[i].genre){
                database.push(movieDatabase[i])
            }
        }
    }
    else {
        database = movieDatabase
    }
    creatingCards()
}

//filtering based on shows
function showsFilter() {
    var shows = document.getElementById('shows')
    if (shows.value != "") {
        database = []
        for (let i = 0; i < movieDatabase.length; i++) {
            for (let j = 0; j < movieDatabase[i].shows.length; j++){
                if (shows.value == movieDatabase[i].shows[j][0]) {
                    database.push(movieDatabase[i])
                    break
                }
            }
        }
    }
    else {
        database = movieDatabase
    }
    creatingCards()
}

// creating movie cards
function creatingCards() {
    var movieCards = document.getElementById('movieCards')
    while (movieCards.firstChild) {
        movieCards.removeChild(movieCards.firstChild);
    }
    for (let i = 0; i < database.length; i++) {
        var card = document.createElement('div')
        movieCards.appendChild(card)
        card.setAttribute('class', 'card col-3 border border-black my-3')
        //top division of card
        var divtop = document.createElement('div')
        card.appendChild(divtop)

        var img = document.createElement('img')
        divtop.appendChild(img)
        img.setAttribute('src', "https://placeimg.com/250/250/nature")

        //movie name
        var movieName = document.createElement('div')
        card.appendChild(movieName)
        movieName.setAttribute('class', 'h2 text-success')
        movieName.textContent = database[i].name

        //mid division of card
        var divMid = document.createElement('div')
        card.appendChild(divMid)

        //genere
        var divMid01 = document.createElement('div')
        divMid.setAttribute('class', 'my-2')
        divMid.appendChild(divMid01)
        divMid01.setAttribute('class', 'd-flex flex-wrap my-2')
        var genre1 = document.createElement('div')
        genre1.setAttribute('class', 'h5')
        genre1.innerHTML = 'GENERE :'
        divMid01.appendChild(genre1)
        var genre2 = document.createElement('div')
        genre2.setAttribute('class', 'h5 mx-3')
        genre2.innerHTML = database[i].genre
        divMid01.appendChild(genre2)

        //languages
        var divMid02 = document.createElement('div')
        divMid.appendChild(divMid02)
        divMid02.setAttribute('class', 'h5')
        divMid02.innerHTML = 'Available in: '

        var divMid03 = document.createElement('div')
        divMid.appendChild(divMid03)
        divMid03.setAttribute('class', 'd-flex flex-wrap my-2')
        for (let j = 0; j < database[i].languages.length; j++) {
            var lang = document.createElement('div')
            divMid03.appendChild(lang)
            lang.setAttribute('class', 'rounded-pill border border-black px-2')
            lang.textContent = database[i].languages[j]
        }

        //shows
        var divMid04 = document.createElement('div')
        divMid.appendChild(divMid04)
        divMid04.setAttribute('class', 'h5 my-2')
        divMid04.innerHTML = 'Select Show: '

        var divMid05 = document.createElement('div')
        divMid.appendChild(divMid05)
        divMid05.setAttribute('class', 'd-flex flex-wrap my-2')
        for (let j = 0; j < database[i].shows.length; j++) {
            var show = document.createElement('div')
            divMid05.appendChild(show)
            show.setAttribute('class', `btn btn-outline-primary m-2`)
            show.setAttribute('data-indexNumber', `${i}`)
            show.setAttribute('id', `card${i}${j}`)
            show.textContent = database[i].shows[j][0]
            show.addEventListener('click', selectShow)
        }
    }
}
//initial cards list
creatingCards()
//resetting showdata key of local storage
localStorage.removeItem('showdata')

//selecting particular show
function selectShow(event) {
    let indexNumber = event.target.getAttribute('data-indexNumber')
    let price = database[indexNumber].shows.find(e => e[0] == event.target.innerHTML)
    let dataObj = {
        name: database[indexNumber].name,
        languages: database[indexNumber].languages,
        show: event.target.innerHTML,
        price: price[1]
    }
    var dataOut = JSON.stringify(dataObj)
    localStorage.setItem('showdata', dataOut)
    location.href = 'theatres.html'
}
