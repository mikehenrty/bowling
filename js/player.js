(function() {
  'use strict';

  /**
   * Player
   * Keeps track of player state.
   */

  function Player(name) {
    this.name = name;
    this.frames = [];
    for (var i = 0; i < MAX_FRAMES; i++) {
      this.frames[i] = [];
    }
  }

  Player.prototype.addPins = function(frame, pins) {
    if (frame > MAX_FRAMES) {
      console.error('Cannot add attempt', this.name, frame);
      return;
    }
    if (this.frames[frame].length > 1) {
      console.error('Cannat add another attempt', this.name, frame);
    }
    this.frames[frame].push(pins);
    this.score += pins;
  };

  Player.prototype.getCurrentAttempt = function(frame) {
    return this.frames[frame].length;
  };

  window.Player = Player;
})();
