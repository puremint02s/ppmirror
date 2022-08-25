import React, { useState } from 'react';
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ Award, setAward, isEditable }) {
  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <>
    {isEditing ?
      <AwardEditForm
        currentAward = {Award}
        setAward = {setAward}
        setIsEditing = {setIsEditing}
      />
      : <AwardCard
          setAward={setAward}
          setIsEditing = {setIsEditing}
          isEditable = {isEditable}
      />
    }
  </>
  );
}

export default Award;
