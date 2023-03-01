import { createSlice } from "@reduxjs/toolkit";
import movePiece from "../assets/ficha-de-ajedrez-34722.mp3";
import capturePiece from "../assets/chess-pieces-hitting-wooden-board-99336.mp3";
import resetPieces from "../assets/board-start-38127.mp3";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    // Current number the dice rolls
    curDice: 0,
    // Number of players - tracks the chosen mode
    numberOfPlayers: 4,
    // Tracks the players turn
    playerTurn: 1,
    // Tracks which piece number is in play
    pieceInPlay: 1,
    // Tracks the amount player can roll a dice when he wants to add a new piece
    newPieceCount: 1,
    // Message prompting the player to choose which piece he wants to mvoe with
    announcement: false,
    // State preventing player from cheating - if he has more active pieces, he has to roll a dice first before clicking on a piece
    pieceHidden: true,
    hideDice: false,
    inProgress: false,
    rollPrevent: false,
    newPrevent: false,
    diceColor: 1,
    humanCheck: ["true", "true", "true", "true"],
    sound: [false, false],
    positionOfAllPieces: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
  },
  reducers: {
    toggleDice(state) {
      state.hideDice = !state.hideDice;
    },
    setNumberOfPlayers(state, action) {
      state.numberOfPlayers = action.payload;
    },
    updateState(state, action) {
      state.diceColor = state.playerTurn;
      state.hideDice = false;
      // ------------ VARIABLES! ----------------------
      const moveSound = () => new Audio(movePiece).play();
      const captureSound = () => new Audio(capturePiece).play();
      const resetSound = () => new Audio(resetPieces).play();

      // -----------------------------------------------------------
      // ----------- Moving rules in an arrow function -------------
      const updateFunction = (arg) => {
        // Some duplicate variables because of AI rule
        const nextPlayerCheck = () => (state.playerTurn === 4 ? 0 : state.playerTurn);
        const nextPlayerHumanCheck = state.humanCheck[nextPlayerCheck()];
        // Skip player count
        let skipPlayerCount = 1;
        // Resets sounds
        state.sound = [false, false];
        // Sets some variables first
        const allPieces = state.positionOfAllPieces;
        const curPlayer = state.positionOfAllPieces[state.playerTurn - 1];
        // Checks the number of players for the game
        const endTurn = (arg) => {
          if (state.playerTurn + arg > state.numberOfPlayers) {
            state.playerTurn = (state.playerTurn + arg) % state.numberOfPlayers;
          } else if (state.playerTurn + arg === state.numberOfPlayers) {
            state.playerTurn = state.numberOfPlayers;
          } else {
            state.playerTurn += arg;
          }
        };
        console.log(state.numberOfPlayers, state.playerTurn);
        // Checks the state of the next player turn
        const nextPlayer = allPieces[nextPlayerCheck()];
        // Checks the state of the player two turns ahead in case if eg. only players 1 and 4 remained in the game, only valid for 4-player version
        const twoTurnsAheadCheck = () => {
          if (state.playerTurn === 4) {
            return 1;
          } else if (state.playerTurn === 3) {
            return 0;
          } else return state.playerTurn + 1;
        };
        const twoTurnsAheadPlayer = allPieces[twoTurnsAheadCheck()];
        // Variables checking finishing fields for current player
        const if44 = curPlayer.some((el) => el === 44);
        const if43 = curPlayer.some((el) => el === 43);
        const if42 = curPlayer.some((el) => el === 42);
        // Variables checking if next player is finished
        const ifNext44 = nextPlayer.some((el) => el === 44);
        const ifNext43 = nextPlayer.some((el) => el === 43);
        const ifNext42 = nextPlayer.some((el) => el === 42);
        const ifNext41 = nextPlayer.some((el) => el === 41);
        const nextFinished = ifNext44 && ifNext43 && ifNext42 && ifNext41;
        // Variables checking if the player 2 turns ahead is finished
        const ifTwoTurnsAhead44 = twoTurnsAheadPlayer.some((el) => el === 44);
        const ifTwoTurnsAhead43 = twoTurnsAheadPlayer.some((el) => el === 43);
        const ifTwoTurnsAhead42 = twoTurnsAheadPlayer.some((el) => el === 42);
        const ifTwoTurnsAhead41 = twoTurnsAheadPlayer.some((el) => el === 41);
        const twoTurnsAheadFinished =
          ifTwoTurnsAhead44 && ifTwoTurnsAhead43 && ifTwoTurnsAhead42 && ifTwoTurnsAhead41;
        // Adds check if the next turn or the player two turns ahead already finished
        if (nextFinished) {
          console.log(nextFinished, twoTurnsAheadFinished);
          skipPlayerCount++;
          if (state.playerTurn > state.numberOfPlayers) {
            state.playerTurn = state.playerTurn % state.numberOfPlayers;
          }
          if (twoTurnsAheadFinished) {
            skipPlayerCount++;
            if (state.playerTurn > state.numberOfPlayers) {
              state.playerTurn = state.playerTurn % state.numberOfPlayers;
            }
          }
        }
        // Dynamically sets the endpoint for moving
        const highestNumber = () => {
          if (if44 && if43 && if42) {
            return 41;
          } else if (if44 && if43) {
            return 42;
          } else if (if44) {
            return 43;
          } else return 44;
        };
        // Next player highest number
        const nextPlayerHighestNumber = () => {
          if (ifNext44 && ifNext43 && ifNext42) {
            return 41;
          } else if (ifNext44 && ifNext43) {
            return 42;
          } else if (ifNext44) {
            return 43;
          } else return 44;
        };
        const curIndex = curPlayer.findIndex((el) => el !== 0 && el <= highestNumber());
        const captureCheck = (dynamicNumber) =>
          allPieces.forEach((el, i) => {
            el.forEach((arg, ix) => {
              const arg2 = (arg + 10) % 40 === 0 ? 40 : (arg + 10) % 40;
              const arg3 = (arg + 30) % 40 === 0 ? 40 : (arg + 30) % 40;
              const arg4 = (arg + 20) % 40 === 0 ? 40 : (arg + 20) % 40;
              if (
                allPieces[i][ix] !== 41 &&
                allPieces[i][ix] !== 42 &&
                allPieces[i][ix] !== 43 &&
                allPieces[i][ix] !== 44
              ) {
                if (
                  (state.playerTurn === 1 &&
                    ((i === 0 && arg === dynamicNumber) ||
                      (i === 1 && arg2 === dynamicNumber) ||
                      (i === 2 && arg3 === dynamicNumber) ||
                      (i === 3 && arg4 === dynamicNumber))) ||
                  (state.playerTurn === 2 &&
                    ((i === 0 && arg3 === dynamicNumber) ||
                      (i === 1 && arg === dynamicNumber) ||
                      (i === 2 && arg4 === dynamicNumber) ||
                      (i === 3 && arg2 === dynamicNumber))) ||
                  (state.playerTurn === 3 &&
                    ((i === 0 && arg2 === dynamicNumber) ||
                      (i === 1 && arg4 === dynamicNumber) ||
                      (i === 2 && arg === dynamicNumber) ||
                      (i === 3 && arg3 === dynamicNumber))) ||
                  (state.playerTurn === 4 &&
                    ((i === 0 && arg4 === dynamicNumber) ||
                      (i === 1 && arg3 === dynamicNumber) ||
                      (i === 2 && arg2 === dynamicNumber) ||
                      (i === 3 && arg === dynamicNumber)))
                ) {
                  const beforeCapture = allPieces[i][ix];
                  allPieces[i][ix] = 0;
                  if (beforeCapture !== allPieces[i][ix]) state.sound[1] = true;
                }
              }
            });
          });
        // -------------- DICE!!! -------------------------
        // Rolls the dice, if not selecting pieces
        if (
          action.payload === "New" ||
          action.payload === "Roll" ||
          arg === "New" ||
          arg === "Roll"
        ) {
          state.curDice = Math.floor(Math.random() * 6 + 1);
        }
        // ------------------------------------------------
        // Checks if its possible for player to make a move, his own pieces in the finishing field can be in the way
        if (action.payload !== "New" || (arg && arg !== "New")) {
          const curPlayerOccurences = curPlayer.every(
            (el) =>
              el + state.curDice > highestNumber() ||
              curPlayer.includes(el + state.curDice) ||
              el === 0
          );
          // If a player clicks on a piece which would capture another one of his own, return
          const pieceInWay =
            action.payload === "New"
              ? curPlayer[curIndex]
              : curPlayer[curPlayer.indexOf(action.payload)];
          if (curPlayer.some((el) => el === pieceInWay + state.curDice)) return;
          if (curPlayerOccurences) {
            if (state.curDice !== 6) {
              endTurn(skipPlayerCount);
            }
            return;
          }
        }
        // Gets the number of pieces in play
        const counts = [];
        for (const [i, num] of curPlayer.entries()) {
          if (
            num !== 0 &&
            num <= highestNumber() &&
            !curPlayer.find(
              (el) => el === num + state.curDice || num + state.curDice > highestNumber()
            )
          ) {
            counts.push(i);
          }
          console.log(num);
        }
        // ---------------------------------------------------------------------------
        // --------------- ROLL A DICE + MOVE A PIECE - 1 OPTION ---------------------
        if (action.payload === "Roll" || arg === "Roll") {
          console.log(counts.length);
          console.log(counts);
          // ------------- Update state repeat ---------------
          // If only one piece in play - update the state
          if (counts.length === 1) {
            const curIndex = counts[0];
            // Prevents you from capturing your own pieces
            const conflictingMove = curPlayer.some(
              (el) => el === curPlayer[curIndex] + state.curDice
            );
            if (conflictingMove) {
              if (state.curDice !== 6) {
                endTurn(skipPlayerCount);
              }
              return;
            }
            // Checks if you can capture enemy pieces
            captureCheck(curPlayer[curIndex] + state.curDice);
            // Checks if your piece hasn't reached the limit yet
            if (curPlayer[curIndex] + state.curDice > highestNumber()) {
              // If it has, but you roll 6, you can roll again, otherwise end turn
              if (state.curDice !== 6) {
                endTurn(skipPlayerCount);
                return;
              } else return;
            }
            // Move the piece
            curPlayer[curIndex] += state.curDice;
            // Checks if you can finish the game
            // Redeclare variables, necessary
            const if44 = curPlayer.some((el) => el === 44);
            const if43 = curPlayer.some((el) => el === 43);
            const if42 = curPlayer.some((el) => el === 42);
            const if41 = curPlayer.some((el) => el === 41);
            const finished = if44 && if43 && if42 && if41;
            if (finished) {
              console.log(curPlayer[curIndex], curIndex);
              let count = 0;
              allPieces.forEach((el) => {
                // Redeclare variables, necessary
                const if44 = el.some((el) => el === 44);
                const if43 = el.some((el) => el === 43);
                const if42 = el.some((el) => el === 42);
                const if41 = el.some((el) => el === 41);
                const finished = if44 && if43 && if42 && if41;
                if (finished) {
                  count++;
                }
              });
              console.log(count);
              const reset = () => {
                state.positionOfAllPieces = [
                  [1, 0, 0, 0],
                  [1, 0, 0, 0],
                  [1, 0, 0, 0],
                  [1, 0, 0, 0],
                ];
                state.curDice = 0;
                state.inProgress = false;
                state.sound = [false, false];
                resetSound();
              };
              if (count === state.numberOfPlayers - 1) {
                alert(
                  `Player ${state.playerTurn} has achieved ${count}. place. No more people left to play. Click to reset the game`
                );
                reset();
              } else {
                if (
                  window.confirm(
                    `Player ${state.playerTurn} has achieved ${count}. place. Do you wish to reset the game?`
                  )
                ) {
                  reset();
                } else {
                  endTurn(skipPlayerCount);
                  console.log(...curPlayer);
                  return;
                }
              }
            }
            state.curDice !== 6 && endTurn(skipPlayerCount);
            // Prevents player from clicking on a piece again until he rolls a dice to prevent cheating
            state.pieceHidden = true;
            state.sound[0] = true;
          }
          // If there are more pieces in play, you have to choose which one to move with
          else {
            state.diceColor = state.playerTurn;
            // Alerts player he has to choose a piece
            state.announcement = true;
            // Allow player to click on an active piece
            state.pieceHidden = false;
            // Prevents player from rolling again
            state.rollPrevent = true;
            // Prevents player from clicking on Add new piece
            state.newPrevent = true;
          }
        }
        // ------------------------------------------------------------
        // ------------------- ADDING NEW PIECE -----------------------
        else if (action.payload === "New" || arg === "New") {
          // Finds your first piece in home field
          const newPiece = curPlayer.indexOf(0);
          // Rolls the dice
          state.curDice = Math.floor(Math.random() * 6 + 1);
          // Player has 3 attempts to roll 6, if successful, put a piece on the starting field and player can play again
          if (state.curDice === 6) {
            state.newPieceCount = 1;
            state.sound[0] = true;
            // If there is another players piece on the starting field and you roll 6, capture it
            captureCheck(curPlayer[newPiece] + 1);
            curPlayer[newPiece] = 1;
            if (state.sound[1]) captureSound();
            else if (state.sound[0]) moveSound();
            return;
          }
          state.newPieceCount++;
          // If the player hasn't rolled 6, end turn
          if (state.newPieceCount > 3) {
            state.newPieceCount = 1;
            endTurn(skipPlayerCount);
            return;
          }
        }

        // ------------------------------------------------------------------
        // ------------------------------------------------------------------
        // ------------- MORE PIECES TO MOVE WITH ---------------------------
        else {
          const humanCheck = state.humanCheck[state.playerTurn - 1];
          if (humanCheck === "false") {
            const randNum = Math.floor(Math.random() * counts.length + 1);
            action.payload = counts[randNum - 1];
          }
          const curIndex = curPlayer.indexOf(action.payload);
          console.log(curIndex);
          // If a player clicks on an inactive piece, or on a piece which can't move due to high dice roll, or which would capture your other piece, return, as it can't be moved
          const conflictingMove = curPlayer.some(
            (el) => el === curPlayer[curIndex] + state.curDice
          );
          console.log(conflictingMove);
          // Prevents you from capturing your own pieces
          if (conflictingMove) {
            if (state.curDice !== 6) {
              endTurn(skipPlayerCount);
            }
            return;
          }
          if (
            curPlayer[curIndex] === 0 ||
            curPlayer[curIndex] === highestNumber() ||
            curPlayer[curIndex] + state.curDice > highestNumber()
          )
            return;

          // Checks if your piece hasn't reached the limit yet
          if (curPlayer[curIndex] + state.curDice > highestNumber()) {
            if (state.curDice !== 6) {
              endTurn(skipPlayerCount);
              return;
            } else return;
          }
          // If a piece step on a square occupied by another piece, capture it
          captureCheck(curPlayer[curIndex] + state.curDice);

          // Updates the state of positions - moves the piece
          curPlayer[curIndex] += state.curDice;
          // Its another players turn
          console.log(state.playerTurn);
          state.curDice !== 6 && endTurn(skipPlayerCount);
          // Hide the message
          state.announcement = false;
          // Prevents player from cheating by clicking on a piece instead of rolling the dice, which would move it by the last amount rolled
          state.pieceHidden = true;
          // Enables roll
          state.rollPrevent = false;
          // Enables new
          state.newPrevent = false;
          // Move sound
          state.sound[0] = true;
        }
        if (state.sound[1]) captureSound();
        else if (state.sound[0]) moveSound();
        // Checks for AI on the next turn
        if (nextPlayerHumanCheck === "false") {
          // If you can either move with your existing piece or add a new piece, there is a 25% chance AI will try to add a new piece and 75% it will move with an existing piece
          const randNum = Math.floor(Math.random() * 4 + 1);
          // Code for AI trying to add a new piece
          if (
            (nextPlayer.every((el) => el !== 1) &&
              nextPlayer.some((el) => el === 0) &&
              randNum === 4) ||
            (nextPlayer.every((el) => el !== 1) && nextPlayer.some((el) => el === 0))
          ) {
            for (let i = 1; i < 4; i++) {
              updateFunction("New");
              if (state.curDice === 6) {
                updateFunction("Roll");
                break;
              }
            }
          } else if (
            (nextPlayer.some((el) => el !== 0 || el < nextPlayerHighestNumber()) &&
              randNum !== 4) ||
            nextPlayer.some((el) => el !== 0 || el < nextPlayerHighestNumber())
          ) {
            updateFunction("Roll");
          }
        }
      };
      // -----------------------------------------------------------
      // ----------------- START-RESET GAME TOGGLE -----------------
      if (action.payload === "Toggle") {
        // If a game is in progress, reset
        if (state.inProgress) {
          if (window.confirm("Really want to reset the game and lose progress?")) {
            state.curDice = 0;
            resetSound();
          } else return;
        }
        if (state.numberOfPlayers === 4) {
          state.positionOfAllPieces = [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
          ];
        } else if (state.numberOfPlayers === 3) {
          state.positionOfAllPieces = [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
          ];
        } else if (state.numberOfPlayers === 2) {
          state.positionOfAllPieces = [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ];
        }
        // Change state
        state.inProgress = !state.inProgress;
        state.playerTurn = 1;
        return;
      }
      updateFunction();
    },
    toggleHuman(state, action) {
      state.humanCheck[state.playerTurn - 1] = action.payload;
    },
    togglePlayerState(state, action) {
      state.playerTurn = action.payload;
    },
  },
});

export const playerActions = playerSlice.actions;

export default playerSlice;
