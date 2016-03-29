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

    this.lane = new Lane(this.players);
    this.lane.onroll = this.roll.bind(this);
    this.scorecard = new Scorecard(this.players);
  }

  GameEngine.prototype.start = function() {
    this.frame = 0;
    this.currentPlayer = 0;
    this.render();
    this.update();
  };

  GameEngine.prototype.isGameOver = function() {
    return this.frame >= MAX_FRAMES;
  };

  GameEngine.prototype.getWinner = function() {
    // Get player with highest score.
    var winningPlayer = 0;
    var highScore = Rules.calculateScore(this.players[winningPlayer]);
    var isTie = false;
    for (var i = 1; i < this.players.length; i++) {
      var currentScore = Rules.calculateScore(this.players[i]);
      if (currentScore === highScore) {
        isTie = true;
      } else {
        if (currentScore > highScore) {
          isTie = false;
          winningPlayer = i;
          highScore = currentScore;
        }
      }
    }
    // Return -1 if game is a tie, player index otherwise.
    return isTie ? -1 : winningPlayer;
  };

  GameEngine.prototype.displayResetButton = function() {
    var resetButton = document.createElement('button');
    resetButton.textContent = 'Start Over';
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

  GameEngine.prototype.nextPlayer = function() {
    this.currentPlayer++;
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
      this.frame++;
    }
  };

  GameEngine.prototype.roll = function(pins) {
    if (this.isGameOver()) {
      // Do nothing if game is over.
      return;
    }

    var player = this.players[this.currentPlayer];
    // Make sure this roll was valid before continuing.
    if (!Rules.isValidAttempt(this.frame, player, pins)) {
      return;
    }

    player.addPins(this.frame, pins);
    if (Rules.isTurnOver(this.frame, player)) {
      this.nextPlayer();
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
    this.lane.update(this.frame, this.currentPlayer);
  };

  window.GameEngine = GameEngine;
})();
