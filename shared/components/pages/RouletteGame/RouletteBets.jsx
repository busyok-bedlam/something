import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RouletteBets extends Component {
    static PropTypes = {
        color: PropTypes.string.isRequired
    };

    static type = {
        COLOR1: 'rBets__wrapper-color1',
        COLOR2: 'rBets__wrapper-color2',
        COLOR3: 'rBets__wrapper-color3'
    };


    render() {
        const {color} = this.props;
        let bets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, i) =>
                (<div className="rBets__item" key={i}>
                    <div>
                        <span className="avatar" style={{backgroundImage: `url('./static/images/user.png')`}}/>
                        <span className='user__level'>12</span>
                        <span>vkvhrhvlvrkrvhlrhvrl</span>
                    </div>
                    <div>
                        <i className='icon-poker-piece'/>1123
                    </div>
                </div>)
            );
        return (
            <div className={"rBets__wrapper " + color}>
                <div className="rBets__header">
                    <h2>Total bet: <i className='icon-poker-piece'/><span>1123</span></h2>
                    <button className="button-border">Find me</button>
                </div>
                <div>
                    {
                        bets
                    }
                </div>
            </div>
        );
    }
}