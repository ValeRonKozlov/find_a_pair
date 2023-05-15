// создаем карточки
class Card {
  _open = false
  _selected = false

  constructor(container, number, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = number;
    this.number = number;

    this.card.addEventListener('click', () => {
      if (this._open == false && this._selected == false) {
        this.card.classList.add('open');
        this._open = true;
        action(this);
      }
    })
    container.append(this.card);
  }

  set open(value) {
    this._open = value;
    value ? this.card.classList.add('open') : this.card.classList.remove('open');
  }
  get open() {
    return this._open;
  }

  set selected(value) {
    value ? this.card.classList.add('selected') : this.card.classList.remove('selected');
  }
  get selected() {
    return this._selected;
  }
}

//  новая игра
function newGame(container, cardsCount) {
  //создаем массив для карточек

  let cardsNumberArray = [];
  let cardsArray = [];

  // делаем логику игры
  let firstCard = null;
  let secondCard = null;

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }
  // перемешиваем массив
  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5)

  for (let number of cardsNumberArray) {
    cardsArray.push(new Card(container, number, flip));
  }

  //  переворот карточки и сравнение карточек
  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.selected = true;
        secondCard.selected = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelectorAll('.card.selected').length == cardsNumberArray.length) {
      // создаем кнопку в конце игры
      buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('btn');
      resBtn = document.createElement('button');
      restartGame = document.querySelector('.game');
      resBtn.classList.add('restart__btn');
      resBtn.textContent = 'Сыграть еще раз';

      // добавляем возможность сброса игры
      resBtn.addEventListener('click', () => {
        container.innerHTML = '';
        cardsArray = [];
        firstCard = null;
        secondCard = null;
        newGame(container, cardsCount)
      })
      // добавляем кнопку на поле игры
      restartGame.append(buttonWrapper, resBtn);
    }
  }
}

newGame(document.getElementById('game'), 16)
