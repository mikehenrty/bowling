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

    this.score = 0; // temporary, use rule based logic
  }

  Player.prototype.addPins = function(frame, pins) {
    if (frame > MAX_FRAMES) {
      console.error('Cannot add frames', this.name, frame, pins);
      return;
    }
    this.frames[frame].push(pins);
    this.score += pins;
  };

  window.Player = Player;
})();
