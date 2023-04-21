import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "./store/player-slice";
import React from "react";

function App() {
  const dispatch = useDispatch();

  const diceNumber = useSelector((state) => state.player.curDice);

  const playerTurn = useSelector((state) => state.player.playerTurn);

  const newPieceCount = useSelector((state) => state.player.newPieceCount);

  const announcement = useSelector((state) => state.player.announcement);

  const pieceHidden = useSelector((state) => state.player.pieceHidden);

  const toggleDice = useSelector((state) => state.player.toggleDice);

  const allPieces = useSelector((state) => state.player.positionOfAllPieces);

  const inProgress = useSelector((state) => state.player.inProgress);

  const numberOfPlayers = useSelector((state) => state.player.numberOfPlayers);

  const rollPrevent = useSelector((state) => state.player.rollPrevent);

  const newPrevent = useSelector((state) => state.player.newPrevent);

  const humanCheck = useSelector((state) => state.player.humanCheck);

  const diceColor = useSelector((state) => state.player.diceColor);

  const player1 = useSelector((state) => state.player.positionOfAllPieces[0]);
  const player2 = useSelector((state) => state.player.positionOfAllPieces[1]);
  const player3 = useSelector((state) => state.player.positionOfAllPieces[2]);
  const player4 = useSelector((state) => state.player.positionOfAllPieces[3]);

  const curPlayer = allPieces[playerTurn - 1];

  const if44 = curPlayer.some((el) => el === 44);
  const if43 = curPlayer.some((el) => el === 43);
  const if42 = curPlayer.some((el) => el === 42);

  const diceNumberDisplay = () => {
    switch (diceNumber) {
      case 1:
        return <span>&#9856;</span>;
      case 2:
        return <span>&#9857;</span>;
      case 3:
        return <span>&#9858;</span>;
      case 4:
        return <span>&#9859;</span>;
      case 5:
        return <span>&#9860;</span>;
      case 6:
        return <span style={{ display: "block", transform: "rotate(90deg)" }}>&#9861;</span>;
      default:
        return;
    }
  };

  const makeTurn = (arg) => {
    dispatch(playerActions.updateState(arg));
  };

  const disableNew = () => {
    const startingFieldCheck = curPlayer.some((el) => el === 1);
    const homeFieldCheck = curPlayer.some((el) => el === 0);
    if (startingFieldCheck || !homeFieldCheck) return true;
    else return false;
  };

  const disableRoll = () => {
    if (if44 && if43 && if42) {
      const activePieceCheck = curPlayer.some((el) => el !== 0 && el < 42);
      if (activePieceCheck) return false;
      else return true;
    } else if (if44 && if43) {
      const activePieceCheck = curPlayer.some((el) => el !== 0 && el < 43);
      if (activePieceCheck) return false;
      else return true;
    } else {
      const activePieceCheck = curPlayer.some((el) => el !== 0 && el < 44);
      if (activePieceCheck) return false;
      else return true;
    }
  };

  return (
    <div className="App">
      <div className="Board">
        {/* Player 1 starting fields */}
        <div className="Field Field__Player1-StartingField Field__Player1-StartingField--1"></div>
        <div className="Field Field__Player1-StartingField Field__Player1-StartingField--2"></div>
        <div className="Field Field__Player1-StartingField Field__Player1-StartingField--3"></div>
        <div className="Field Field__Player1-StartingField Field__Player1-StartingField--4"></div>
        {/* Player 2 starting fields */}
        <div className="Field Field__Player2-StartingField Field__Player2-StartingField--1"></div>
        <div className="Field Field__Player2-StartingField Field__Player2-StartingField--2"></div>
        <div className="Field Field__Player2-StartingField Field__Player2-StartingField--3"></div>
        <div className="Field Field__Player2-StartingField Field__Player2-StartingField--4"></div>
        {/* Player 3 starting fields */}
        <div className="Field Field__Player3-StartingField Field__Player3-StartingField--1"></div>
        <div className="Field Field__Player3-StartingField Field__Player3-StartingField--2"></div>
        <div className="Field Field__Player3-StartingField Field__Player3-StartingField--3"></div>
        <div className="Field Field__Player3-StartingField Field__Player3-StartingField--4"></div>
        {/* Player 4 starting fields */}
        <div className="Field Field__Player4-StartingField Field__Player4-StartingField--1"></div>
        <div className="Field Field__Player4-StartingField Field__Player4-StartingField--2"></div>
        <div className="Field Field__Player4-StartingField Field__Player4-StartingField--3"></div>
        <div className="Field Field__Player4-StartingField Field__Player4-StartingField--4"></div>
        {/* Fields for all players */}
        <div className="Field Field__Default Field__Default--1 Field__Player1-FinishingField"></div>
        <div className="Field Field__Default Field__Default--2"></div>
        <div className="Field Field__Default Field__Default--3"></div>
        <div className="Field Field__Default Field__Default--4"></div>
        <div className="Field Field__Default Field__Default--5"></div>
        <div className="Field Field__Default Field__Default--6"></div>
        <div className="Field Field__Default Field__Default--7"></div>
        <div className="Field Field__Default Field__Default--8"></div>
        <div className="Field Field__Default Field__Default--9"></div>
        <div className="Field Field__Default Field__Default--10"></div>
        <div className="Field Field__Default Field__Default--11 Field__Player2-FinishingField"></div>
        <div className="Field Field__Default Field__Default--12"></div>
        <div className="Field Field__Default Field__Default--13"></div>
        <div className="Field Field__Default Field__Default--14"></div>
        <div className="Field Field__Default Field__Default--15"></div>
        <div className="Field Field__Default Field__Default--16"></div>
        <div className="Field Field__Default Field__Default--17"></div>
        <div className="Field Field__Default Field__Default--18"></div>
        <div className="Field Field__Default Field__Default--19"></div>
        <div className="Field Field__Default Field__Default--20"></div>
        <div className="Field Field__Default Field__Default--21 Field__Player4-FinishingField"></div>
        <div className="Field Field__Default Field__Default--22"></div>
        <div className="Field Field__Default Field__Default--23"></div>
        <div className="Field Field__Default Field__Default--24"></div>
        <div className="Field Field__Default Field__Default--25"></div>
        <div className="Field Field__Default Field__Default--26"></div>
        <div className="Field Field__Default Field__Default--27"></div>
        <div className="Field Field__Default Field__Default--28"></div>
        <div className="Field Field__Default Field__Default--29"></div>
        <div className="Field Field__Default Field__Default--30"></div>
        <div className="Field Field__Default Field__Default--31 Field__Player3-FinishingField"></div>
        <div className="Field Field__Default Field__Default--32"></div>
        <div className="Field Field__Default Field__Default--33"></div>
        <div className="Field Field__Default Field__Default--34"></div>
        <div className="Field Field__Default Field__Default--35"></div>
        <div className="Field Field__Default Field__Default--36"></div>
        <div className="Field Field__Default Field__Default--37"></div>
        <div className="Field Field__Default Field__Default--38"></div>
        <div className="Field Field__Default Field__Default--39"></div>
        <div className="Field Field__Default Field__Default--40"></div>
        {/* Player 1 finishing fields */}
        <div className="Field Field__Player1-FinishingField Field__Player1-FinishingField--1"></div>
        <div className="Field Field__Player1-FinishingField Field__Player1-FinishingField--2"></div>
        <div className="Field Field__Player1-FinishingField Field__Player1-FinishingField--3"></div>
        <div className="Field Field__Player1-FinishingField Field__Player1-FinishingField--4"></div>
        {/* Player 2 finishing fields */}
        <div className="Field Field__Player2-FinishingField Field__Player2-FinishingField--1"></div>
        <div className="Field Field__Player2-FinishingField Field__Player2-FinishingField--2"></div>
        <div className="Field Field__Player2-FinishingField Field__Player2-FinishingField--3"></div>
        <div className="Field Field__Player2-FinishingField Field__Player2-FinishingField--4"></div>
        {/* Player 3 finishing fields */}
        <div className="Field Field__Player3-FinishingField Field__Player3-FinishingField--1"></div>
        <div className="Field Field__Player3-FinishingField Field__Player3-FinishingField--2"></div>
        <div className="Field Field__Player3-FinishingField Field__Player3-FinishingField--3"></div>
        <div className="Field Field__Player3-FinishingField Field__Player3-FinishingField--4"></div>
        {/* Player 4 finishing fields */}
        <div className="Field Field__Player4-FinishingField Field__Player4-FinishingField--1"></div>
        <div className="Field Field__Player4-FinishingField Field__Player4-FinishingField--2"></div>
        <div className="Field Field__Player4-FinishingField Field__Player4-FinishingField--3"></div>
        <div className="Field Field__Player4-FinishingField Field__Player4-FinishingField--4"></div>
        {/* Arrows showing the directions for all players */}
        <div className="Arrow Arrow--1">
          <div>&rarr;</div>
        </div>
        <div className="Arrow Arrow--2">
          <div>&darr;</div>
        </div>
        <div className="Arrow Arrow--3">
          <div>&uarr;</div>
        </div>
        <div className="Arrow Arrow--4">
          <div>&larr;</div>
        </div>
        {/* Player 1 Pieces */}
        <div
          className={`Piece Piece__Player1 Piece__Player1--1 Field__Default--${
            player1[0]
          } Field__Player1-FinishingField--${player1[0] - 40} ${
            (playerTurn !== 1 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player1[0])}></div>
        <div
          className={`Piece Piece__Player1 Piece__Player1--2 Field__Default--${
            player1[1]
          } Field__Player1-FinishingField--${player1[1] - 40} ${
            (playerTurn !== 1 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player1[1])}></div>
        <div
          className={`Piece Piece__Player1 Piece__Player1--3 Field__Default--${
            player1[2]
          } Field__Player1-FinishingField--${player1[2] - 40} ${
            (playerTurn !== 1 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player1[2])}></div>
        <div
          className={`Piece Piece__Player1 Piece__Player1--4 Field__Default--${
            player1[3]
          } Field__Player1-FinishingField--${player1[3] - 40} ${
            (playerTurn !== 1 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player1[3])}></div>
        {/* Player 2 Pieces */}
        <div
          className={`Piece Piece__Player2 Piece__Player2--1 Field__Default--${
            player2[0] !== 0 && ((player2[0] + 10) % 40 === 0 ? 40 : (player2[0] + 10) % 40)
          } Field__Player2-FinishingField--${player2[0] - 40} ${
            (playerTurn !== 2 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player2[0])}></div>
        <div
          className={`Piece Piece__Player2 Piece__Player2--2 Field__Default--${
            player2[1] !== 0 && ((player2[1] + 10) % 40 === 0 ? 40 : (player2[1] + 10) % 40)
          } Field__Player2-FinishingField--${player2[1] - 40} ${
            (playerTurn !== 2 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player2[1])}></div>
        <div
          className={`Piece Piece__Player2 Piece__Player2--3 Field__Default--${
            player2[2] !== 0 && ((player2[2] + 10) % 40 === 0 ? 40 : (player2[2] + 10) % 40)
          } Field__Player2-FinishingField--${player2[2] - 40} ${
            (playerTurn !== 2 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player2[2])}></div>
        <div
          className={`Piece Piece__Player2 Piece__Player2--4 Field__Default--${
            player2[3] !== 0 && ((player2[3] + 10) % 40 === 0 ? 40 : (player2[3] + 10) % 40)
          } Field__Player2-FinishingField--${player2[3] - 40} ${
            (playerTurn !== 2 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"}`}
          onClick={() => makeTurn(player2[3])}></div>
        {/* Player 3 Pieces */}
        <div
          className={`Piece Piece__Player3 Piece__Player3--1 Field__Default--${
            player3[0] !== 0 && ((player3[0] + 30) % 40 === 0 ? 40 : (player3[0] + 30) % 40)
          } Field__Player3-FinishingField--${player3[0] - 40} ${
            (playerTurn !== 3 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers === 2 && "Disabled"}`}
          onClick={() => makeTurn(player3[0])}></div>
        <div
          className={`Piece Piece__Player3 Piece__Player3--2 Field__Default--${
            player3[1] !== 0 && ((player3[1] + 30) % 40 === 0 ? 40 : (player3[1] + 30) % 40)
          } Field__Player3-FinishingField--${player3[1] - 40} ${
            (playerTurn !== 3 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers === 2 && "Disabled"}`}
          onClick={() => makeTurn(player3[1])}></div>
        <div
          className={`Piece Piece__Player3 Piece__Player3--3 Field__Default--${
            player3[2] !== 0 && ((player3[2] + 30) % 40 === 0 ? 40 : (player3[2] + 30) % 40)
          } Field__Player3-FinishingField--${player3[2] - 40} ${
            (playerTurn !== 3 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers === 2 && "Disabled"}`}
          onClick={() => makeTurn(player3[2])}></div>
        <div
          className={`Piece Piece__Player3 Piece__Player3--4 Field__Default--${
            player3[3] !== 0 && ((player3[3] + 30) % 40 === 0 ? 40 : (player3[3] + 30) % 40)
          } Field__Player3-FinishingField--${player3[3] - 40} ${
            (playerTurn !== 3 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers === 2 && "Disabled"}`}
          onClick={() => makeTurn(player3[3])}></div>
        {/* Player 4 Pieces */}
        <div
          className={`Piece Piece__Player4 Piece__Player4--1 Field__Default--${
            player4[0] !== 0 && ((player4[0] + 20) % 40 === 0 ? 40 : (player4[0] + 20) % 40)
          } Field__Player4-FinishingField--${player4[0] - 40} ${
            (playerTurn !== 4 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers !== 4 && "Disabled"}`}
          onClick={() => makeTurn(player4[0])}></div>
        <div
          className={`Piece Piece__Player4 Piece__Player4--2 Field__Default--${
            player4[1] !== 0 && ((player4[1] + 20) % 40 === 0 ? 40 : (player4[1] + 20) % 40)
          } Field__Player4-FinishingField--${player4[1] - 40} ${
            (playerTurn !== 4 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers !== 4 && "Disabled"}`}
          onClick={() => makeTurn(player4[1])}></div>
        <div
          className={`Piece Piece__Player4 Piece__Player4--3 Field__Default--${
            player4[2] !== 0 && ((player4[2] + 20) % 40 === 0 ? 40 : (player4[2] + 20) % 40)
          } Field__Player4-FinishingField--${player4[2] - 40} ${
            (playerTurn !== 4 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers !== 4 && "Disabled"}`}
          onClick={() => makeTurn(player4[2])}></div>
        <div
          className={`Piece Piece__Player4 Piece__Player4--4 Field__Default--${
            player4[3] !== 0 && ((player4[3] + 20) % 40 === 0 ? 40 : (player4[3] + 20) % 40)
          } Field__Player4-FinishingField--${player4[3] - 40} ${
            (playerTurn !== 4 || pieceHidden) && "NoClick"
          } ${!inProgress && "NoClickButton"} ${numberOfPlayers !== 4 && "Disabled"}`}
          onClick={() => makeTurn(player4[3])}></div>
        {/* Dice */}
        <div className={`Dice Dice--${diceColor} ${diceNumber === 6 && "PlayAnimation"}`}>
          {!toggleDice && diceNumberDisplay()}
        </div>
        {/* 'Roll a dice!' button */}
        <button
          className={`Button Button__Roll Button--${playerTurn} ${
            (newPieceCount !== 1 ||
              disableRoll() ||
              !inProgress ||
              rollPrevent ||
              humanCheck[playerTurn - 1] === "false") &&
            "NoClickButton"
          }`}
          onClick={() => makeTurn("Roll")}>
          Roll a dice!
        </button>
        {/* 'Add new piece.' button */}
        <button
          className={`Button Button__New Button--${playerTurn} ${
            (disableNew() || !inProgress || newPrevent || humanCheck[playerTurn - 1] === "false") &&
            "NoClickButton"
          }`}
          onClick={() => makeTurn("New")}>
          Add new piece!
          <br />
          {newPieceCount}. attempt
        </button>
        {/* Start - reset button */}
        <button className="Button Button__Start" onClick={() => makeTurn("Toggle")}>
          {inProgress ? "Reset the game" : "Start the game"}
        </button>
        <div className={announcement ? "Announcement" : "Disabled"}>
          Choose a piece to move with!
        </div>
        <div className={`PlayerSelection ${inProgress && "Disabled"}`}>
          <label htmlFor="playerNumber">Number of players:</label>
          <select
            name="playerNumber"
            id="playerNumber"
            value={numberOfPlayers}
            onChange={(e) => dispatch(playerActions.setNumberOfPlayers(Number(e.target.value)))}>
            <option value={2}>{2}</option>
            <option value={3}>{3}</option>
            <option value={4}>{4}</option>
          </select>
        </div>
        {/* Human-AI check */}
        {/* <div className={`HumanCheck ${inProgress && "Disabled"}`}>
          <div className="HumanCheck__Holder">
            <label htmlFor="player1">Player 1:</label>
            <select
              name="player1"
              id="player1"
              value={humanCheck[0]}
              onChange={(e) => dispatch(playerActions.toggleHuman(e.target.value))}
              onClick={() => dispatch(playerActions.togglePlayerState(1))}>
              <option value={true}>Human</option>
              <option value={true}>Human</option>
            </select>
          </div>
          <div className="HumanCheck__Holder">
            <label htmlFor="player2">Player 2:</label>
            <select
              name="player2"
              id="player2"
              value={humanCheck[1]}
              onChange={(e) => dispatch(playerActions.toggleHuman(e.target.value))}
              onClick={() => dispatch(playerActions.togglePlayerState(2))}>
              <option value={true}>Human</option>
              <option value={false}>Computer</option>
            </select>
          </div>
          <div className="HumanCheck__Holder">
            <label htmlFor="player3">Player 3:</label>
            <select
              name="player3"
              id="player3"
              value={humanCheck[2]}
              onChange={(e) => dispatch(playerActions.toggleHuman(e.target.value))}
              onClick={() => dispatch(playerActions.togglePlayerState(3))}
              className={numberOfPlayers === 2 ? "Disabled" : ""}>
              <option value={true}>Human</option>
              <option value={false}>Computer</option>
            </select>
          </div>
          <div className="HumanCheck__Holder">
            <label htmlFor="player4">Player 4:</label>
            <select
              name="player4"
              id="player4"
              value={humanCheck[3]}
              onChange={(e) => dispatch(playerActions.toggleHuman(e.target.value))}
              onClick={() => dispatch(playerActions.togglePlayerState(4))}
              className={numberOfPlayers !== 4 ? "Disabled" : ""}>
              <option value={true}>Human</option>
              <option value={false}>Computer</option>
            </select>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
