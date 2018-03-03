import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Textarea = ({error, isChanged, isUsed, ...props}) => (
    <div>
        <div className={{...props}.className}
             {
                 ...( isChanged && isUsed
                     ? (error)
                         ? {className: {...props}.className + ` invalid`}
                         : {className: {...props}.className + ` valid`}
                     : 'input-float' )
             }>
            <textarea {...props} placeholder='' className=""/>
            <label htmlFor={props.id}>{props.placeholder}</label>
        </div>
        {isChanged && isUsed && error}
    </div>
);

Textarea.propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Textarea);
