import React from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Alert({ message }) {
    return (
        <div className='alert'>
            <FontAwesomeIcon icon={faExclamationCircle} />
            {message}
        </div>
    );
}

export default Alert;
