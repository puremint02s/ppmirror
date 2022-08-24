import React, { useState } from 'react';
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ userid, Award, setAward, isEditable }) {
  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <>
    {isEditing ?
      <AwardEditForm
        userid ={userid}
        currentAward = {Award}
        setAward = {setAward}
        setIsEditing = {setIsEditing}
      />
      : <AwardCard
          award = {Award}
          setIsEditing = {setIsEditing}
          isEditable = {isEditable}

        
      />
    }
  </>
  );
}

export default Award;
