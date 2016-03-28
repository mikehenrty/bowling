(function() {
  'use strict';

  const MAX_FRAMES = 10;

  /**
   * Game Engine
   * Orchestrates input, scoring and game display.
   */

  function GameEngine() {
    this.players = [
      new Player('Player 1'),
      new Player('Player 1.3'),
      new Player('Player 2')
    ];

    this.gameover = false;
    this.frame = 0;
    this.lane = new Lane();
    this.lane.onroll = this.roll.bind(this);

    this.container = document.body;
  }

  GameEngine.prototype.start = function() {
    this.gameover = false;
    this.frame = 1;
    this.currentPlayer = 0;
    this.render();
  };

  GameEngine.prototype.checkWin = function() {
    if (this.frame > MAX_FRAMES) {
      this.gameover = true;

      // Get player with highest score.
      var winningPlayer = 0;
      var highScore = this.players[winningPlayer].score;
      var isTie = false;
      for (var i = 1; i < this.players.length; i++) {
        if (this.players[i].score === highScore) {
          isTie = true;
        } else {
          isTie = false;
          if (this.players[i].score > highScore) {
            winningPlayer = i;
            highScore = this.players[i].score;
          }
        }
      }

      // Now display who won.
      var winContainer = document.createElement('p');
      if (isTie) {
        winContainer.textContent = 'It\'s a tie :/';
      } else {
        winContainer.textContent = this.players[winningPlayer].name + ' wins!';
      }
      this.lane.container.remove();
      this.container.appendChild(winContainer);
    }
  };

  GameEngine.prototype.roll = function(pins) {
    if (this.gameover) {
      // Do nothing if game is over.
      return;
    }

    this.players[this.currentPlayer].addPoints(pins);
    this.currentPlayer++;
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
      this.frame++;
    }
    this.render();

    this.checkWin();
  };

  GameEngine.prototype.render = function() {
    this.container.innerHTML = '';

    var frameDisplay = document.createElement('p');
    frameDisplay.textContent = 'Frame ' + this.frame;
    this.container.appendChild(frameDisplay);

    this.players.forEach(function(player) {
      var el = document.createElement('p');
      el.textContent = player.name + ':: ' + player.score;
      this.container.appendChild(el);
    }.bind(this));

    this.lane.render();
    this.container.appendChild(this.lane.container);

    // Allow the game to be reset at any time.
    var resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.onclick = function() {
      this.onreset && this.onreset();
    }.bind(this);
    this.container.appendChild(resetButton);
  };

  window.GameEngine = GameEngine;
})();
