import React from 'react';


const Navigation = ({ onRouteChange, isSingedIn }) => {
    if (isSingedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p
            onClick={() => onRouteChange('singout')}
            className='f3 link dim black underline pa3 pointer'>
              Sing Out
          </p>
        </nav>
    );
    } else {
      return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p
            onClick={() => onRouteChange('singin')}
            className='f3 link dim black underline pa3 pointer'>
              Sing In
          </p>
          <p
            onClick={() => onRouteChange('register')}
            className='f3 link dim black underline pa3 pointer'>
              Register
          </p>
        </nav>
    );
  }
}

export default Navigation;
