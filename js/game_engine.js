(function() {
  'use strict';

  /**
   * Game Engine
   * Orchestrates input, scoring and game display.
   */

  function GameEngine() {
    this.players = [
      new Player('Player 1'),
      new Player('Player 2'),
      new Player('Player 3')
    ];

    this.gameover = false;
    this.frame = 0;
    this.lane = new Lane();
    this.lane.onroll = this.roll.bind(this);
    this.scorecard = new Scorecard(this.players);
  }

  GameEngine.prototype.start = function() {
    this.gameover = false;
    this.frame = 1;
    this.currentPlayer = 0;
    this.render();
    this.update();
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

      // Allow the game to be reset.
      var resetButton = document.createElement('button');
      resetButton.textContent = 'Reset';
      resetButton.onclick = function() {
        this.onreset && this.onreset();
      }.bind(this);
      this.container.appendChild(resetButton);
    }
  };

  GameEngine.prototype.roll = function(pins) {
    if (this.gameover) {
      // Do nothing if game is over.
      return;
    }

    this.players[this.currentPlayer].addPins(this.frame, pins);
    this.currentPlayer++;
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
      this.frame++;
    }
    this.update();

    this.checkWin();
  };

  GameEngine.prototype.render = function() {
    this.container = document.body;
    this.container.innerHTML = '';

    this.frameContainer = document.createElement('p');
    this.container.appendChild(this.frameContainer);

    this.scorecard.render();
    this.container.appendChild(this.scorecard.container);

    this.lane.render();
    this.container.appendChild(this.lane.container);
  };

  GameEngine.prototype.update = function() {
    this.frameContainer.textContent = 'Frame ' + this.frame;
    this.scorecard.update();
  };

  window.GameEngine = GameEngine;
})();
