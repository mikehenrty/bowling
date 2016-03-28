(function() {
  'use strict';

  /**
   * Game Engine
   * Orchestrates input, scoring and game display.
   */

  function GameEngine(playerCount) {
    this.players = [];
    for (var i = 0; i < playerCount; i++) {
      var playerName = 'Player ' + (i + 1);
      this.players.push(new Player(playerName));
    }

    this.frame = 0;
    this.lane = new Lane();
    this.lane.onroll = this.roll.bind(this);
    this.scorecard = new Scorecard(this.players);
  }

  GameEngine.prototype.start = function() {
    this.frame = 1;
    this.currentPlayer = 0;
    this.render();
    this.update();
  };

  GameEngine.prototype.isGameOver = function() {
    return this.frame > MAX_FRAMES;
  };

  GameEngine.prototype.getWinner = function() {
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
    // Return -1 if game is a tie, player index otherwise.
    return isTie ? -1 : winningPlayer;
  };

  GameEngine.prototype.displayResetButton = function() {
    var resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.onclick = function() {
      this.onreset && this.onreset();
    }.bind(this);
    this.container.appendChild(resetButton);
  };

  GameEngine.prototype.displayWin = function() {
    if (!this.isGameOver()) {
      console.error('Cannot display win screen, game still on');
    }

    // Now display who won.
    var winner = this.getWinner();
    var winContainer = document.createElement('p');
    if (winner === -1) {
      winContainer.textContent = 'It\'s a tie :/';
    } else {
      winContainer.textContent = this.players[winner].name + ' wins!';
    }
    this.scorecard.update(-1, winner);
    this.lane.container.remove();
    this.container.appendChild(winContainer);
    this.displayResetButton();
  };

  GameEngine.prototype.roll = function(pins) {
    if (this.isGameOver()) {
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

    if (this.isGameOver()) {
      this.displayWin();
    }
  };

  GameEngine.prototype.render = function() {
    this.container = document.body;
    this.container.innerHTML = '';

    this.scorecard.render();
    this.container.appendChild(this.scorecard.container);

    this.lane.render();
    this.container.appendChild(this.lane.container);
  };

  GameEngine.prototype.update = function() {
    this.scorecard.update(this.frame, this.currentPlayer);
  };

  window.GameEngine = GameEngine;
})();
