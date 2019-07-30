import React, { useState, useEffect } from "react";
import Gem from "./Gem";

export default function Pit(props) {
  const [gems, setGems] = useState(props.gems);
  const [playersTurn, setPlayersTurn] = useState(props.playersTurn);
  const players = props.players;
  const index = props.index;
  const pitOnClick = index =>
    playersTurn === players.user1 && (index > 5 && index < 12)
      ? props.onPitClick(index)
      : playersTurn === players.user2 && (index > -1 && index < 6)
      ? props.onPitClick(index)
      : null;
  const pitClass = gems > 4 ? gems > 9 ? "gemsPitLarge" : "gemsPitMedium" : "gemsPitSmall";
  const pitOnClickStyle =
    playersTurn === players.user1 && (index > 5 && index < 12)
      ? { cursor: "pointer" }
      : playersTurn === players.user2 && (index > -1 && index < 6)
      ? { cursor: "pointer" }
      : {};

  let i = 0,
    arrGems = [];

  for (i; i < gems; i++) {
    arrGems.push(<Gem key={i} />);
  }

  useEffect(() => {
    setGems(props.gems);
    setPlayersTurn(props.playersTurn);
  }, [props]);

  return (
    <div>
      {gems > 0 ? (
        <div
          className="pitShadow"
          style={pitOnClickStyle}
          onClick={() => pitOnClick(index)}
        >
          <div className={pitClass}>{arrGems}</div>
        </div>
      ) : (
        <div className="pitShadow"></div>
      )}
    </div>
  );
}
