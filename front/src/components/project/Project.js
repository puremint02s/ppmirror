import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

const Project = ({key, project, setProjects, isEditable}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm 
          key={key}
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
        ) : (
        <ProjectCard 
          project={project}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  )
}

export default Project;