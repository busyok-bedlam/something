import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Input = ({error, isChanged, isUsed, ...props}) => (
    <div>
        <div className={props.className}
             {
                 ...( isChanged && isUsed
                     ? (error)
                         ? {className: props.className + ` invalid`}
                         : {className: props.className + ` valid`}
                     : {className: props.className || 'input-float'})
             }
        >
            <input {...props} placeholder='' className=''/>
            <label htmlFor={props.id}>{props.placeholder}</label>
        </div>
        {isChanged && isUsed && error}
</div>
);

Input.propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Input);
