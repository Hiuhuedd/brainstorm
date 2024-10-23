"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React, { useState } from "react";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";

interface Task {
  fileURI: string;
  programCode: string;
  isCommonUnit: boolean;
  unitCode: string;
  unitName: string;
  semester: number;
  year: number;
  resourceDate: Date;
  isProfessorEndorsed: boolean;
  isExam: boolean;
  isNotes: boolean;
  unitProfessor: string;
}

interface Props {
  title: string;
  resources: Task[]; // Pass the resources as props
}

function Tasks({ title, resources }: Props) {
  const { theme } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter resources based on the search term
  const filteredResources = resources.filter((task) =>
    task.unitName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TaskStyled theme={theme}>
      <div className="header">
        <h1 className="text-xl">
          {resources.length} {title}
        </h1>
        <SearchBar
          type="text"
          placeholder={`Search ${title.toLowerCase()}..`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="tasks grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((task) => (
            <TaskItem key={task.unitCode} task={task} />
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorWhite};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  .header {
    display: flex;
    justify-content: space-between; // Changed from space-around to space-between for better alignment
    align-items: center;
    margin-bottom: 2rem;
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: 3rem;
    font-weight: 500;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => props.theme.colorPrimaryGreen};
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 250px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colorPrimaryBlue};
  }
`;

export default Tasks;
