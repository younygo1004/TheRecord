import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="nav">
      <Link to="/home">Home</Link> <br />
      <Link to="/diary">Diary</Link> <br />
      <Link to="/album">Album</Link>
    </div>
  );
}

export default Navigation;
