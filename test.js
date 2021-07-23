const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
let search = '';
const openInfoButtons = document.querySelectorAll('[data-info-target]')
      const closeInfoButtons = document.querySelectorAll('[data-info-close]')
      const overlay = document.getElementById('overlay');


const fetchSearch = async() => {
  movies = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=f4eaeb80`)
    .then(res => res.json())
    .then(res => res.Search )
    

  
    movieTitles = movies.map((movie) => {
      return movie.Title
    })
    console.log(movieTitles)

    movieTitles.forEach(element => 
      fetch(`http://www.omdbapi.com/?t=${element}&apikey=f4eaeb80`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)



      document.querySelector('#app').insertAdjacentHTML('afterbegin',
      `
      <div class="perso">
      <div class="card w-75 align-items-center">
      <div class="card-body">
      <img src="${data.Poster}"/>
      <h5 class="card-title">titre : ${data.Title}</h5>
      <p>date de sortie : ${data.Released}</p>
      <button data-info-target="#info">Read more</button>

        <div class="info active" id="info">
          <div class="info-header">
            <div class="title>${data.Title}</div>
            <button data-close-button class="close-button">&times;</button>
          </div>

          <div class="info-body">
          <h1>${data.Title}</h1>
          <img src="${data.Poster}"  />
          <p>${data.Plot}</p>
          </div>
        </div>  
        <div class="active" id="overlay"></div>
      </div>
      </div>
      </div>
      
      `
      )
      const openInfoButtons = document.querySelectorAll('[data-info-target]')
      const closeInfoButtons = document.querySelectorAll('[data-info-close]')
      const overlay = document.getElementById('overlay');

      openInfoButtons.forEach(button => {
        button.addEventListener('click', () => {
          const info = document.querySelector(button.dataset.infoTarget)
          openInfo(info)
        })
      })

      overlay.addEventListener('click', () => {
        const infos = document.querySelectorAll('.info.active')
        infos.forEach(info => {
          closeInfo(info)
        })
      })

      closeInfoButtons.forEeach(button => {
        button.addEventListener('click', () => {
          const info = button.closest('.info')
          closeInfo(info)
        })
      })

      function openInfo(info) {
        if (info == null) return
        info.classList.add('active')
        overlay.classList.add('active')
      }

      function closeInfo(info) {
        if (info == null) return
        info.classList.remove('active')
        overlay.classList.remove('active')
      }
    }
      ))
      
}


const searchDisplay = async() => {
  await fetchSearch();

};

searchInput.addEventListener('input', (e) => {
  search = e.target.value;
  searchDisplay();
})