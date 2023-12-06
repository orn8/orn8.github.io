function handleButtonClick(button) {
  var url = button.dataset.url;
  if (url) {
    var gameWindow = window.open('gameX.html?url=' + encodeURIComponent(url), '_blank');
  }
}

function createGameButton(game) {
  var button = document.createElement('button');
  button.textContent = game.name;
  button.dataset.url = game.url;
  button.classList.add('button');
  return button;
}

function setupButtons(games) {
  var buttonsContainer = document.getElementById('gameButtons');
  games.forEach(game => {
    var button = createGameButton(game);
    button.addEventListener('click', function(event) {
      handleButtonClick(event.target);
    });
    buttonsContainer.appendChild(button);
  });
}

function searchGames() {
  var input, filter, buttons, i;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  buttons = document.getElementById('gameButtons').getElementsByTagName('button');
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      buttons[i].style.display = '';
    } else {
      buttons[i].style.display = 'none';
    }
  }
}

document.getElementById('searchInput').addEventListener('input', function() {
  searchGames();
});

document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    this.blur();
    var searchButton = document.getElementById('searchButton');
    searchButton.style.backgroundColor = '#555';
    searchButton.style.color = 'white';
    setTimeout(function() {
      searchButton.style.backgroundColor = 'white';
      searchButton.style.color = 'black';
    }, 300);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('gamelist.json')
    .then(response => response.json())
    .then(data => {
      setupButtons(data.games);
    });
});