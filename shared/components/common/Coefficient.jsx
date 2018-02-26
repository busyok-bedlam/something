import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class Coefficient extends Component {
    static types = {
        GOOD: 'GOOD',
        BAD: 'BAD'
    };

    render() {
        const {profit} = this.props;
        switch (profit) {
            case Coefficient.types.GOOD:
                return (
                    <div className = "coeff__item coeff__item-good ">
                        {this.props.children}x
                    </div>
                );
            case Coefficient.types.BAD:
                return (
                    <div className = "coeff__item coeff__item-bad ">
                        {this.props.children}x
                    </div>
                );
        }
    }
}

Coefficient.propTypes = {
    profit: PropTypes.string
};