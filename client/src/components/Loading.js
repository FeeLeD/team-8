import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Loading = () => {
  const [warning, setWarning] = useState(false);

  if (!warning) {
    setTimeout(() => {
      setWarning(true)
    }, 4000);
  }

  return (
    <div className='window'>
      <div className='loading'>
        {
          !warning ?
            <Fragment>Загрузка...</Fragment>
            :
            <Fragment>
              <p>Истекло время ожидания...</p>
              <Link className="loading-link" to="/login">Войти снова</Link>
            </Fragment>
        }
      </div>
    </div>
  );
}

export default Loading;