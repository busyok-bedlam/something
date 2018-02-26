import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Input = ({error, isChanged, isUsed, ...props}) => (
    <div className={{...props}.className}
         {
             ...( isChanged && isUsed
                 ? (error)
                     ? {className: {...props}.className + ` invalid`}
                     : {className: {...props}.className + ` valid`}
                 : 'input-border-bottom' )
         }
    >
        <input {...props} className=""/>
        {isChanged && isUsed && error}
    </div>
);

Input.propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Input);
