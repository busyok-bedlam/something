import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class Rhomb extends Component {
    static types = {
        RED: 'RED',
        BLACK: 'BLACK',
        UNKNOWN: 'UNKNOWN',
    };

    render() {
        const {color, selected, onSelect} = this.props;
        switch (color) {
            case Rhomb.types.RED:
                return (
                    <div
                        onClick={onSelect || (() => null)}
                        className={
                            selected ?
                                "rhomb red" :
                                "rhomb red not-selected"
                        }
                    />
                );
            case Rhomb.types.BLACK:
                return (
                    <div
                        onClick={onSelect || (() => null)}
                        className={
                            selected ?
                                "rhomb black" :
                                "rhomb black not-selected"
                        }
                    />
                );
            case Rhomb.types.UNKNOWN:
            default:
                return (
                    <div
                        onClick={onSelect || (() => null)}
                        className={
                            selected ?
                                "rhomb undefined" :
                                "rhomb undefined not-selected"
                        }/>
                );
        }
    }
}

Rhomb.propTypes = {
    color: PropTypes.string,
    notSelected: PropTypes.bool
};