(function() {
  'use strict';

  function startAttract() {
    var startButton = document.createElement('button');
    startButton.textContent = 'Start Game!';
    startButton.onclick = function() {
      startButton.remove();
      startGame();
    };
    document.body.appendChild(startButton);
  }

  function startGame() {
    var game = new GameEngine();
    game.start();
  }

  document.addEventListener('DOMContentLoaded', startAttract);
})();
