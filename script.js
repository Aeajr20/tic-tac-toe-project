// This line waits until the webpage is fully loaded before running the code inside.
$(document).ready(function() {

  // These lines set up some variables for the game.
  let currentPlayer = 'X'; 
  let gameOver = false; // 
  const grid = ['', '', '', '', '', '', '', '', '']; // This represents the game board.

  // This code runs when a cell on the game board is clicked.
  $('#ticTacToeGrid .cell').click(function() {

      // If the game is over, we don't want to do anything.
      if (gameOver) return;

      // This gets the cell that was clicked.
      const index = $(this).data('index');

      // If the cell is empty...
      if (grid[index] === '') {

          // ...we mark it with the current player's symbol...
          grid[index] = currentPlayer;
          $(this).text(currentPlayer);

          // ...and check if that made them win.
          if (checkWin()) {
              $('#gameResult').text(`Player ${currentPlayer} Wins!`).removeClass('d-none');
              gameOver = true; // The game is now over.
          } else if (grid.every(cell => cell !== '')) { // If all cells are filled and no one has won, it's a draw.
              $('#gameResult').text('It\'s a Draw!').removeClass('d-none');
              gameOver = true; // The game is now over.
          } else { // If the game isn't over, we switch to the other player.
              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
              $('#turnIndicator').text(`${currentPlayer}'s Turn`);    
          }
      }
  });

  // This code runs when the restart button is clicked.
  $('#restartButton').click(function() {
      grid.fill(''); // This clears the game board.
      gameOver = false; // The game is not over.
      currentPlayer = 'X'; // We start with player X.
      $('#turnIndicator').text(`${currentPlayer}'s Turn`);
      $('#ticTacToeGrid .cell').text(''); // This clears the game board display.
      $('#gameResult').addClass('d-none'); // This hides the game result message.
  });

  // This function checks if the current player has won.
  function checkWin() {
      const winPatterns = [ // These are the ways to win the game.
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
          [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
      // This checks if any of the win patterns match the current player's moves.
      return winPatterns.some(pattern => 
          pattern.every(index => grid[index] === currentPlayer)
      );
  }
});
