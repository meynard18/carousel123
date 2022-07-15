const url = 'http://localhost:4232';
const path = 'movies';

const btnRight = document.querySelector('.btn-right');
const btnLeft = document.querySelector('.btn-left');
const cardContainerEl = document.querySelector('.cardContainer');
const cards = document.querySelector('.cardContainer');

const fetchData = async () => {
   const response = await fetch([url, path].join('/'));
   const data = await response.json();
   displayData(data);
};

const displayData = (movies) => {
   const movieString = movies
      .map((item) => {
         return `
            <div class="cards">
                <img class="image" src="${item.imgUrl}"/>
                <h3 class="movieName">Movie: ${item.name}</h3>
                <h3 class="movieInfo">Info: ${item.outlineInfo}</h3>
            </div>
      `;
      })
      .join('');
   cards.innerHTML = movieString;

   const slides = Array.from(cardContainerEl.children);
   const slideWidth = slides[0].getBoundingClientRect().width;

   btnRight.addEventListener('click', () => {
      cardContainerEl.scrollLeft += slideWidth * 4;
      btnLeft.classList.add('displayLeft');
      if (cardContainerEl.scrollLeft > 500) {
         btnRight.classList.add('removeRight');
      }
   });
   btnLeft.addEventListener('click', () => {
      cardContainerEl.scrollLeft -= slideWidth * 4;

      if (cardContainerEl.scrollLeft < 800) {
         return btnLeft.classList.remove('displayLeft');
      }
      if (cardContainerEl.scrollLeft > 800) {
         return btnRight.classList.remove('removeRight');
      }
   });
};

fetchData();
