(function() {
  'use strict';

  /**
   * Lane
   * Allows for player input, ie. rolling the ball.
   */

  function Lane() {
  }

  Lane.prototype.render = function() {
    this.container = document.createElement('div');

    // Create buttons for each possible pin knockdown count.
    for (var i = 0; i <= 10; i++) {
      var b = document.createElement('button');
      b.textContent = i;
      b.onclick = function(pins) {
        this.onroll && this.onroll(pins);
      }.bind(this, i);
      this.container.appendChild(b);
    }
  };

  window.Lane = Lane;
})();
