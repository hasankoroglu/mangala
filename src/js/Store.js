import React from "react";
import Gem from "./Gem";

function Store(props) {
  let numberOfGems = props.gems;

  let i = 0;
  let arrGems = [];

  for (i; i < numberOfGems; i++) {
    arrGems.push(<Gem key={i} />);
  }

  return (
    <div>
      <div className="store">
        <div className="gemsStore">{arrGems}</div>
        {i}
      </div>
    </div>
  );
}

export default Store;
