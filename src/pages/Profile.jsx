import React from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Profile() {
  return (
    <div className="profile-page">
      <Header pageTitle="Profile" showSearchButton={ false } />
      <MenuInferior />
    </div>
  );
}

export default Profile;
