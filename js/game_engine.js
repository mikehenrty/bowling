(function() {
  'use strict';

  function GameEngine() {
    this.el = document.createElement('div');
    this.el.textContent = 'Game started!';
  }

  GameEngine.prototype.start = function() {
    document.body.appendChild(this.el);
  };

  window.GameEngine = GameEngine;
})();
