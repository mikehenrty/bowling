(function() {
  'use strict';

  /**
   * Scorecard
   * Display for players score.
   */

  function Scorecard(players) {
    this.players = players;
  }

  Scorecard.prototype.createFrameRow = function() {
    var row = document.createElement('tr');
    row.appendChild(document.createElement('td'));
    for (var i = 0; i < MAX_FRAMES; i++) {
      var cell = document.createElement('td');
      cell.textContent = i + 1;
      row.appendChild(cell);
    }
    // Placeholder cell for total score column.
    var scoreCell = document.createElement('td');
    scoreCell.textContent = 'Score';
    row.appendChild(scoreCell);
    return row;
  };

  Scorecard.prototype.createPlayerRow = function(player) {
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    nameCell.textContent = player.name;
    row.appendChild(nameCell);
    for (var i = 0; i < MAX_FRAMES; i++) {
      row.appendChild(document.createElement('td'));
    }
    // Placeholder cell for total score column.
    row.appendChild(document.createElement('td'));
    return row;
  };

  Scorecard.prototype.render = function() {
    this.container = document.createElement('table');
    this.container.appendChild(this.createFrameRow());

    this.playerRows = [];
    for (var p = 0; p < this.players.length; p++) {
      var playerRow = this.createPlayerRow(this.players[p]);
      this.container.appendChild(playerRow);
      this.playerRows.push(playerRow);
    }
  };

  Scorecard.prototype.update = function(currentPlayer) {
    for (var p = 0; p < this.players.length; p++) {
      var row = this.playerRows[p];
      row.classList.toggle('current', (p === currentPlayer));
      for (var i = 0; i < MAX_FRAMES; i++) {
        // Plus one because the first cell is player name.
        var cell = row.children[i + 1];
        cell.textContent = JSON.stringify(this.players[p].frames[i]);
      }
      // Again, plus one because the first cell is player name.
      row.children[MAX_FRAMES + 1].textContent = this.players[p].score;
    }
  };

  window.Scorecard = Scorecard;
})();
