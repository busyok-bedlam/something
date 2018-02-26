import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Textarea = ({error, isChanged, isUsed, ...props}) => (
    <div className={{...props}.className}
         {
             ...( isChanged && isUsed
                 ? (error)
                     ? {className: {...props}.className + ` invalid`}
                     : {className: {...props}.className + ` valid`}
                 : 'input-border-bottom' )
         }>
        <textarea {...props} className=""/>
        {isChanged && isUsed && error}
    </div>
);

Textarea.propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Textarea);
