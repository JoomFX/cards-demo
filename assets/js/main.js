// Get JSON data
const getData = async () => {
  const response = await fetch('../../data/dataset1.json');
  const data = await response.json();

  return data;
}

// Custom button element
class CustomButton extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const button = document.createElement('a');
    button.setAttribute('class', 'qb-card__button');

    const link = this.getAttribute('link');
    button.setAttribute('href', link);

    const text = this.getAttribute('text');
    button.textContent = text;

    this.appendChild(button);
  }
}
customElements.define("custom-button", CustomButton);

// Build Card UI
const buildCard = (card, index) => {
  const markup = `
    <div class="col-md-3 ${index > 4 ? 'grid--margin-top' : ''}">
      <div class="qb-card qb-card--category-${card.category.toLowerCase()} ${card.featured ? 'qb-card--featured' : ''}">
        <div class="qb-card__banner">${card.category}</div>
        <div class="qb-card__image">
          <img src="${card.image}" alt="Card Image" />
        </div>
        <div class="qb-card__content-container">
          <div class="qb-card__text-container">
            <h4 class="qb-card__title">${card.title ? card.title : "National Park"}</h4>
            <div class="qb-card__text">${card.body}</div>
          </div>
          ${card.link ? `
          <div class="qb-card__button-container">
            <custom-button link="${card.link}" text="${card.linkText}"></custom-button>
          </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  return markup;
}

// Render all cards
const renderCards = async (data) => {
  const cardsContainer = document.querySelector('.cards-container');
  const cards = await data;

  let html = '';
  cards.parks.forEach((card, index) => {
    if (!card.image) { return; }

    if (card.featured) {
      html = buildCard(card, index) + html;
    } else {
      html += buildCard(card, index);
    }
  });

  cardsContainer.innerHTML = html;
}

renderCards(getData());