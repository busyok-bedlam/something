import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Scrollbar from './../../common/Scrollbar.jsx';
import User from './../../common/User.jsx';

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
                <User level={9} name={'ConorMcGregor'} image='./static/images/user.png'/>
                <div>
                    <i className='icon-poker-piece'/>1123
                </div>
            </div>)
        );

        return (
            <div className={"rBets__wrapper " + color}>
                <div className="rBets__header">
                    <h2>Total bet: <i className='icon-poker-piece'/><span>1123</span></h2>
                    {/* TODO: Add scroll for my bet and add class "active"*/}
                    <button className="button-border">Find me</button>
                </div>
                <div style={{height: '24.4rem'}} className='fix-scroll-margin'>
                    <Scrollbar>
                        {
                            bets
                        }
                    </Scrollbar>
                </div>
            </div>
        );
    }
}