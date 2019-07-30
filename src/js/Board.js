import React, { useState, useEffect } from "react";
import Store from "./Store";
import Pit from "./Pit";

function Board(props) {
  const [pitsGems, setPitsGems] = useState(props.pitsGems);
  const [playersTurn, setPlayersTurn] = useState(props.playersTurn);
  let firstPlayersGems = pitsGems[pitsGems.length - 2];
  let secondPlayersGems = pitsGems[pitsGems.length - 1];

  useEffect(() => {
    setPitsGems(props.pitsGems);
    setPlayersTurn(props.playersTurn);
  }, [props]);

  let tmpPitGems = pitsGems.filter((gems, index) => index < 12);

  return (
    <div className="woodenBG">
      <Store gems={secondPlayersGems} />
      <div className="pits">
        {tmpPitGems.map((gems, index) => 
            <Pit
              key={index}
              index={index}
              gems={gems}
              onPitClick={props.onPitClick}
              playersTurn={playersTurn}
              players={props.players}
            />
        )}
      </div>
      <Store gems={firstPlayersGems} />
    </div>
  );
}

export default Board;
