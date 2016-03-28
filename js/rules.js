(function() {
  'use strict';

  /**
   * Rules
   * Logic for rules and scoring in bowling.
   */

  var Rules = {
    isTurnOver: function(frame, player) {
      var scores = player.frames[frame];
      return scores.length === 2 || scores[0] === MAX_PINS;
    },

    isStrike: function(frame, player) {
      var frame = player.frames[frame];
      var score = frame[0];
      return score === MAX_PINS;
    },

    isSpare: function(frame, player) {
      var frame = player.frames[frame];
      var firstScore = frame[0];
      var secondScore = frame[1];
      if (typeof firstScore === 'undefined'
          || typeof secondScore === 'undefined') {
        return false;
      }
      return (firstScore + secondScore === MAX_PINS);
    },

    // Helper for getting display text
    getAttemptString: function(frame, player, attempt) {
      var scores = player.frames[frame];
      var score = scores[attempt];

      if (typeof score === 'undefined') {
        return '_';
      }

      if (attempt === 0 && Rules.isStrike(frame, player)) {
        return 'X';
      }

      if (attempt === 1 && Rules.isSpare(frame, player)) {
        return '/';
      }

      return score;
    },
  };

  window.Rules = Rules;
})();
