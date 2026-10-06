import { ReactNode } from 'react';

export const Welcome = (): ReactNode => {
  const onStartGame = (): void => {};

  return (
    <>
      <div className="welcome">Welcome to Memory Game</div>
      <p>flip, track your moves and match every card pair! </p>

      <div className="rules">
        <ul>
          <li>Flip two cards per turn</li>
          <li>Match pairs to keep them opened</li>
          <li>Clear it with fewest moves</li>
        </ul>
      </div>

      <button className="game-start" onClick={onStartGame}>
        Start!
      </button>
    </>
  );
};
