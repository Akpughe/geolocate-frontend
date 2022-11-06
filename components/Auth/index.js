import React from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

const Index = ({ auth, handleShow }) => {
  return (
    <>
      {auth == 'login' ? (
        <Login handleShow={handleShow} />
      ) : auth == 'register' ? (
        <Register handleShow={handleShow} />
      ) : (
        ''
      )}
    </>
  );
};

export default Index;
