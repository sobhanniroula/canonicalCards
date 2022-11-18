import './style.scss';
import * as moment from 'moment';

const cardsNode = document.getElementById('cards');

fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
.then((response) => response.json())
.then(data => {
    renderCards(data);
})
.catch(err => console.log(err));

const renderCards = cards => {
    let cardsInnerHtml = '';

    cards.map(card => {
        const cardToShow = `
            <div class="col-4">
                <div class="p-card u-no-padding card">
                    <h5 class="topic-type">${card._embedded['wp:term'][1][0].name || 'Topic'}</h5>
                    <hr class="u-sv1">
                    <img class="p-card__image" src=${card.featured_media}>
                    <div class="p-card__inner card-details">
                        <a href=${card.link} class="card-title-link">
                            <h3 class="card-title">
                                ${card.title.rendered}
                            </h3>
                        </a>
                        By <a href=${card._embedded.author[0].link}>
                            <span class="card-title">
                                ${card._embedded.author[0].name}
                            </span>
                        </a> on ${moment(card.date).format('DD MMMM YYYY')}
                    </div>
                    <hr class="u-no-margin--bottom">
                    <div class="p-card__inner card-type">${card.type}</div>
                </div>
            </div>
        `;
        
        cardsInnerHtml += cardToShow;
    });

    cardsNode.innerHTML = cardsInnerHtml;
}