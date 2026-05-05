//code Description: This component is responsible for rendering individual character cards. 
// It receives a character object as a prop and displays the character's image, name, and status in a styled card format.
//Authors: Sridharshini
//Date: 05/05/2026
//File: Character.jsx

import React from "react";

const Character = ({ character }) => {
  return (
    <div className="card">
      <img src={character?.image} alt={character?.name} />
      <h4>{character?.name}</h4>
      <p>Status: {character?.status}</p>
    </div>
  );
};

export default Character;