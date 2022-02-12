import { useEffect, useState } from 'react';

const Square = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className='square'>
      {children}
    </button>
  );
};
export const App = () => {
  const [boardInfo, setBoardInfo] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [turn, setTurn] = useState('maru');
  const [winner, setWinner] = useState('');
  useEffect(() => {
    if (winner !== '') {
      // 勝者が決まってたら終了
      return;
    }
    // 縦、横でそろってるラインがないか調べる
    for (let i = 0; i < 3; i++) {
      if (
        boardInfo[i * 3] !== '' &&
        boardInfo[i * 3] === boardInfo[i * 3 + 1] &&
        boardInfo[i * 3 + 1] === boardInfo[i * 3 + 2]
      ) {
        setWinner(boardInfo[i * 3]);
        break;
      }
      if (
        boardInfo[i] !== '' &&
        boardInfo[0 + i] === boardInfo[3 + i] &&
        boardInfo[3 + i] === boardInfo[6 + i]
      ) {
        setWinner(boardInfo[i]);
      }
    }
    // 斜めでそろってるラインがないか調べる
    if (
      boardInfo[0] !== '' &&
      boardInfo[0] === boardInfo[4] &&
      boardInfo[4] === boardInfo[8]
    ) {
      setWinner(boardInfo[0]);
    }
    if (
      boardInfo[2] !== '' &&
      boardInfo[2] === boardInfo[4] &&
      boardInfo[4] === boardInfo[6]
    ) {
      setWinner(boardInfo[2]);
    }
  });

  return (
    <div className='App'>
      {winner !== '' && (
        <div>
          {winner} won!
          <button
            onClick={() => {
              setBoardInfo(['', '', '', '', '', '', '', '', '']);
              setWinner('');
            }}
          >
            play again
          </button>
        </div>
      )}
      {[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ].map((row, index) => {
        return (
          <div className='board-row' key={index}>
            {row.map((index) => {
              return (
                <Square
                  key={index}
                  onClick={() => {
                    if (winner !== '') {
                      // 既に勝者が決まってたらボードを変更できないようにする
                      return;
                    }
                    if (boardInfo[index] === '') {
                      // 埋めようとしているマスが空マスだったらボードを更新する
                      setBoardInfo((boardInfo) => {
                        const copy = [...boardInfo];
                        copy[index] = turn;

                        // 相手の手番にする
                        return copy;
                      });
                      setTurn((turn) => (turn === 'maru' ? 'batsu' : 'maru'));
                    }
                  }}
                >
                  {boardInfo[index] === ''
                    ? ''
                    : boardInfo[index] === 'maru'
                    ? '○'
                    : '×'}
                </Square>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
