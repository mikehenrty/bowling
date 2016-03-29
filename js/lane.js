(function() {
  'use strict';

  /**
   * Lane
   * Allows for player input, ie. rolling the ball.
   */

  function Lane(players) {
    this.players = players;
  }

  Lane.prototype.render = function() {
    this.container = document.createElement('div');

    this.message = document.createElement('p');
    this.container.appendChild(this.message);

    // Create buttons for each possible pin knockdown count.
    this.buttons = [];
    for (var i = 0; i <= 10; i++) {
      var b = document.createElement('button');
      this.buttons.push(b);
      b.textContent = i;
      b.onclick = function(pins) {
        this.onroll && this.onroll(pins);
      }.bind(this, i);
      this.container.appendChild(b);
    }
  };

  Lane.prototype.update = function(frame, currentPlayer) {
    var player = this.players[currentPlayer];
    this.message.textContent =
      'How many pins will ' + player.name + ' knock down?';

    // Only enable the buttons that represent a valid role.
    for (var i = 0; i < this.buttons.length; i++) {
      var b = this.buttons[i];
      var pins = parseInt(b.textContent, 10);
      b.disabled = !Rules.isValidAttempt(frame, player, pins);
    }
  };

  window.Lane = Lane;
})();
