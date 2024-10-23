// app/Components/Modal/Modal.tsx
"use client";
import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../ProfileForm/ProfileForm';

const Modal = ({   }) => {
  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
      <ProfileForm />
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }
`;

export default Modal;
