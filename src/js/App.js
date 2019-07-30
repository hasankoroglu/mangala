import React, { useState } from "react";
import Board from "./Board";
import { Button, Modal, Form } from "react-bootstrap";
import arrowPng from "../img/arrow.png";

const PlayerName = props => {
  return (
    <div className="headingDiv">
      <span className="wrapper">
        <img
          src={arrowPng}
          alt=""
          className={
            props.playersTurn.length > 0
              ? props.playersTurn === props.playersName
                ? "show"
                : "hide"
              : "hide"
          }
        />
        <span className="heading">{props.playersName}</span>
      </span>
    </div>
  );
};

function App() {
  const initialPlayers = { user1: "", user2: "" };
  const initialGems = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const initialGemsStart = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0];
  const [pitsGems, setPitsGems] = useState(initialGems);
  const [gameStatus, setGameStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [players, setPlayers] = useState(initialPlayers);
  const [playersTurn, setPlayersTurn] = useState("");
  const [validated, setValidated] = useState(false);
  const [pitsEmpty, setPitsEmpty] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const startGame = event => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      setPitsGems(initialGemsStart);
      setGameStatus(true);
      setPlayersTurn(players.user1);
      handleModalClose();
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const resetGame = () => {
    setPitsGems(initialGems);
    setPlayers(initialPlayers);
    setPlayersTurn("");
    setGameStatus(false);
  };

  const handleInputChange = event => {
    const { id, value } = event.target;
    setPlayers({ ...players, [id]: value });
  };

  const onPitClick = param => {
    let nextIndex;
    setPitsGems(pitsGems => {
      let tmpPitsGems = [...pitsGems];
      let nextPits, lastIndex, lastIndexGems, sumOfUser1sGems=0, sumOfUser2sGems=0;
      let currentPitGems = tmpPitsGems[param];

      if (currentPitGems > 1) {
        nextPits = currentPitGems - 1;
        currentPitGems = 1;
      } else {
        nextPits = 1;
        currentPitGems = 0;
      }

      tmpPitsGems[param] = currentPitGems;

      if (playersTurn === players.user1) {
        let i = 1;
        for (i; i <= nextPits; i++) {
          nextIndex = param + i;
          if (param > 5 && param < 12) {
            if (nextIndex > 12) {
              nextIndex = 18 - nextIndex;
              if (nextIndex < 0) {
                nextIndex = nextIndex + 7;
              }
            }
            tmpPitsGems[nextIndex]++;
          }
        }
        lastIndex = nextIndex;
        lastIndexGems = tmpPitsGems[lastIndex];
        if (lastIndex > -1 && lastIndex < 6 && lastIndexGems % 2 === 0) {
          tmpPitsGems[12] = tmpPitsGems[12] + lastIndexGems;
          tmpPitsGems[lastIndex] = 0;
        }
        if (lastIndex > 5 && lastIndex < 12 && lastIndexGems === 1) {
          tmpPitsGems[12] =
            tmpPitsGems[12] + lastIndexGems + tmpPitsGems[lastIndex - 6];
          tmpPitsGems[lastIndex] = 0;
          tmpPitsGems[lastIndex - 6] = 0;
        }

        i = 6;
        for (i; i < 12; i++) {
          sumOfUser1sGems += tmpPitsGems[i];
        }

        i = 0;
        if (sumOfUser1sGems === 0) {
          for (i; i < 6; i++) {
            sumOfUser2sGems += tmpPitsGems[i];
            tmpPitsGems[i] = 0;
          }
          tmpPitsGems[12] = tmpPitsGems[12] + sumOfUser2sGems;
        }

        setPitsEmpty(prevState=>{
          if (sumOfUser1sGems === 0) {
            prevState = true;
          }
          return prevState;
        });

        return tmpPitsGems;
      } else {
        let i = 1;
        for (i; i <= nextPits; i++) {
          nextIndex = param - i;
          if (param > -1 && param < 6) {
            if (nextIndex < 0) {
              if (nextIndex === -1) {
                nextIndex = 13;
              } else {
                nextIndex = 4 - nextIndex;
              }
            }
            tmpPitsGems[nextIndex]++;
          }
        }
        lastIndex = nextIndex;
        lastIndexGems = tmpPitsGems[lastIndex];
        if (lastIndex > 5 && lastIndex < 12 && lastIndexGems % 2 === 0) {
          tmpPitsGems[13] = tmpPitsGems[13] + lastIndexGems;
          tmpPitsGems[lastIndex] = 0;
        }
        if (lastIndex > -1 && lastIndex < 6 && lastIndexGems === 1) {
          tmpPitsGems[13] =
            tmpPitsGems[13] + lastIndexGems + tmpPitsGems[lastIndex + 6];
          tmpPitsGems[lastIndex] = 0;
          tmpPitsGems[lastIndex + 6] = 0;
        }

        i = 0;
        for (i; i < 6; i++) {
          sumOfUser2sGems += tmpPitsGems[i];
        }
        
        i = 6;
        if (sumOfUser2sGems === 0) {
          for (i; i < 12; i++) {
            sumOfUser1sGems += tmpPitsGems[i];
            tmpPitsGems[i] = 0;
          }
          tmpPitsGems[13] = tmpPitsGems[13] + sumOfUser1sGems;
        }

        setPitsEmpty(prevState=>{
          if (sumOfUser2sGems === 0) {
            prevState = true;
          }
          return prevState;
        });

        return tmpPitsGems;
      }
    });

    setPlayersTurn(playersTurn => {
      let currentPlayer = playersTurn;
      if (!(nextIndex === 12 || nextIndex === 13)) {
        currentPlayer =
          playersTurn === players.user1 ? players.user2 : players.user1;
      }
      return currentPlayer;
    });
  };

  return (
    <div>
      {!pitsEmpty ? (
        <div>
          <PlayerName playersTurn={playersTurn} playersName={players.user2} />
          <Board
            pitsGems={pitsGems}
            onPitClick={index => onPitClick(index)}
            playersTurn={playersTurn}
            players={players}
          />
          <PlayerName playersTurn={playersTurn} playersName={players.user1} />
          <Button
            className="startReset"
            type="button"
            onClick={gameStatus ? resetGame : handleModalShow}
          >
            {gameStatus ? "Baştan Başla" : "Başla"}
          </Button>
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Oyuncu İsimleri</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Lütfen oyuncu isimlerini giriniz.
              <br />
              <br />
              <Form
                noValidate
                validated={validated}
                id="playersNames"
                onSubmit={startGame}
              >
                <Form.Group controlId="user1">
                  <Form.Control
                    type="text"
                    placeholder="1. Oyuncu"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="user2">
                  <Form.Control
                    type="text"
                    placeholder="2. Oyuncu"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                İptal
              </Button>
              <Button variant="primary" type="submit" form="playersNames">
                Başla
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div>
          <span className="heading">
            {players.user1} : {pitsGems[12]}
          </span>
          <br />
          <span className="heading">
            {players.user2} : {pitsGems[13]}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
