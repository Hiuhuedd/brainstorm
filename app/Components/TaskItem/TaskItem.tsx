"use client";
import React from "react";
import { useGlobalState } from "@/app/context/globalProvider"; // Custom hook from your project
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate"; // Date formatting utility
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa"; // Icons for task actions
import { heart } from "@/app/utils/Icons";

// Defining the Task interface for TypeScript
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
  task: Task;
}

function TaskItem({ task }: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();

  const handleUpdateTask = () => {
    const updatedTask = {
      ...task,
      isProfessorEndorsed: !task.isProfessorEndorsed, // Toggling professor endorsement
    };
    updateTask(updatedTask); // Update task function from global state
  };

  return (
    <TaskItemStyled theme={theme}>
      <header>
        <div className="task-icon">
          <h1>{task.unitName}</h1> {/* Task/Unit Name */}
        </div>
        <div className="endorsement-icon">
          {task.isProfessorEndorsed &&
            <FaCheckCircle className="endorsed-icon" />
         }
          <p>{task.isProfessorEndorsed ? "Endorsed" : ""}</p>
        </div>
      </header>

      <p>Professor: {task.unitProfessor}</p> {/* Task/Unit Professor */}
      <p className="date">{formatDate(task.resourceDate.toString())}</p> Formatted Date

      <div className="task-footer">
       
        <button className="delete" onClick={() => deleteTask(task.unitCode)}>
          {heart}
          
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
 padding: 1.2rem 1rem;
  border-radius: .5rem;
  background-color: ${(props) => props.theme.colorGradient};
  box-shadow: ${(props) => props.theme.shadow1};
  border: 1px solid ${(props) => props.theme.colorGreenDark};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) => props.theme.shadowHover};
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      color: ${(props) => props.theme.textPrimary};
    }

    .endorsement-icon {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      p {
        font-size: 0.9rem;
        color: ${(props) => props.theme.textSecondary};
        font-weight: 500;
      }

      .endorsed-icon {
        color: ${(props) => props.theme.iconSuccess};
      }

      .not-endorsed-icon {
        color: ${(props) => props.theme.iconNeutral};
      }
    }
  }

  p {
    font-size: 1rem;
    color: ${(props) => props.theme.textSecondary};
  }

  .date {
    font-size: 0.875rem;
    color: ${(props) => props.theme.textMuted};
    margin-top: auto;
    font-style: italic;
  }

  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    button {
      border: none;
      outline: none;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.3s ease, transform 0.2s ease;

      &:hover {
        transform: scale(1.05);
      }

      svg {
        font-size: 1rem;
      }

      &:first-of-type {
        background-color: ${(props) => props.theme.buttonPrimary};
        color: ${(props) => props.theme.buttonTextPrimary};
      }

      &.delete {
        background-color: ${(props) => props.theme.buttonDanger};
        color: ${(props) => props.theme.buttonTextDanger};
      }
    }
  }
`;

export default TaskItem;
