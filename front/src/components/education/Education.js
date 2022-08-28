import React, { useState } from 'react';
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, getEducations, isEditable }) {
  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <>
    {isEditing ?
      <EducationEditForm
        key={education.eduId}
        currentEducation={education}
        getEducations={getEducations}
        setIsEditing={setIsEditing}
      />
      : <EducationCard
        key={education.eduId}
        education={education}
        isEditable={isEditable}
        getEducations={getEducations}
        setIsEditing={setIsEditing}
      />
    }
  </>
  );
}

export default Education;