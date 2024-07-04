$(document).ready(function() {
    let currentPlayer = 'X';
    let gameOver = false;
    const grid = ['', '', '', '', '', '', '', '', ''];
    
    $('#ticTacToeGrid .cell').click(function() {
      if (gameOver) return;
      
      const index = $(this).data('index');
      if (grid[index] === '') {
        grid[index] = currentPlayer;
        $(this).text(currentPlayer);
        if (checkWin()) {
          $('#gameResult').text(`Player ${currentPlayer} Wins!`).removeClass('d-none');
          gameOver = true;
        } else if (grid.every(cell => cell !== '')) {
          $('#gameResult').text('It\'s a Draw!').removeClass('d-none');
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          $('#turnIndicator').text(`${currentPlayer}'s Turn`);    
        }
      }
    });
    
    $('#restartButton').click(function() {
      grid.fill('');
      gameOver = false;
      currentPlayer = 'X';
      $('#turnIndicator').text(`${currentPlayer}'s Turn`);
      $('#ticTacToeGrid .cell').text('');
      $('#gameResult').addClass('d-none');
    });
    
    function checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
      return winPatterns.some(pattern => 
        pattern.every(index => grid[index] === currentPlayer)
      );
    }
  });