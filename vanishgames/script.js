document.addEventListener('DOMContentLoaded', function() {
  const gamesString = `
    Game 2;https://google.com
    Game 1;https://bing.com
    Game 3;https://duckduckgo.com
    `;

  function setupButtons(gamesString) {
    const buttonsContainer = document.getElementById('gameButtons');
    const gamesArray = gamesString.trim().split('\n')
      .map(line => {
        const [name, url] = line.trim().split(';');
        return { name, url };
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort games by name

    gamesArray.forEach(game => {
      const button = document.createElement('button');
      button.textContent = game.name;
      button.dataset.url = game.url;
      button.classList.add('button');
      button.addEventListener('click', function() {
        window.open('gameX.html?url=' + encodeURIComponent(game.url), '_blank');
      });
      buttonsContainer.appendChild(button);
    });
  }

  function searchGames() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const buttons = [...document.getElementById('gameButtons').getElementsByTagName('button')];
    buttons.forEach(button => {
      const text = button.textContent || button.innerText;
      button.style.display = text.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
    });
  }

  const searchButton = document.getElementById('searchButton');
  function triggerSearchButtonEffect() {
    searchButton.style.backgroundColor = '#555';
    searchButton.style.color = 'white';
    setTimeout(function() {
      if (!searchButton.matches(':hover')) {
        searchButton.style.backgroundColor = 'white';
        searchButton.style.color = 'black';
      }
    }, 300);
  }

  document.getElementById('searchInput').addEventListener('input', searchGames);
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') triggerSearchButtonEffect();
  });

  searchButton.addEventListener('click', () => searchInput.value !== '' && triggerSearchButtonEffect());
  searchButton.addEventListener('mouseover', () => searchInput.value !== '' && (searchButton.style.backgroundColor = '#555', searchButton.style.color = 'white'));
  searchButton.addEventListener('mouseout', () => !searchButton.matches(':hover') && (searchButton.style.backgroundColor = '', searchButton.style.color = ''));

  setupButtons(gamesString);
});