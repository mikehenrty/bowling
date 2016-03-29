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

    isValidAttempt: function(frame, player, score) {
      if (frame >= MAX_FRAMES) {
        console.error('Rules: too many frames', frame);
        return false;
      }

      if (score < 0 || score > MAX_PINS) {
        console.error('Rules: invalid attempt score', score);
        return false;
      }

      if (player.getCurrentAttempt(frame) === 1) {
        var firstAttemptScore = player.frames[frame][0];
        if (firstAttemptScore + score > MAX_PINS) {
          console.error('Rules: both attempts exceeded pins');
          return false;
        }
      }
      return true;
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

    getFrameString: function(frame, player) {
      if (player.frames[frame].length === 0) {
        return '~';
      } else {
        return Rules.calculateFrameScore(frame, player);
      }
    },

    calculateComplexFrameScore: function(frame, player) {
      var total = MAX_PINS;
      var nextFrame = player.frames[frame + 1];

      if (nextFrame && typeof nextFrame[0] !== 'undefined') {
        total += nextFrame[0];
      }

      if (Rules.isStrike(frame, player)
          && nextFrame && typeof nextFrame[1] !== 'undefined') {
        total += nextFrame[1];
      }

      return total;
    },

    calculateFrameScore: function(frame, player) {
      // If it's complex, do calculations in another function.
      if (Rules.isSpare(frame, player) || Rules.isStrike(frame, player)) {
        return Rules.calculateComplexFrameScore(frame, player);
      }

      var total = 0;
      var scores = player.frames[frame];
      if (typeof scores[0] !== 'undefined') {
        total += scores[0];
      }
      if (typeof scores[1] !=='undefined') {
        total += scores[1];
      }
      return total;
    },

    calculateScore: function(player) {
      var total = 0;
      for (var i = 0; i < MAX_FRAMES; i++) {
        total += Rules.calculateFrameScore(i, player);
      }
      return total;
    }
  };

  window.Rules = Rules;
})();
