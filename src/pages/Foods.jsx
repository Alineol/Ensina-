import React from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Foods(props) {
  const { location } = props;
  const { pathname } = location;
  return (
    <>
      <Header pageTitle="Foods" showSearchButton props={ props } />
      <MenuInferior />
    </>
  );
}

export default Foods;
