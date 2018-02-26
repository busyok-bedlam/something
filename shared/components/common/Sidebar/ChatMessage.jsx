import React, {Component} from "react";
import PropTypes          from 'prop-types';

export default class RightSidebar extends Component {

    static propTypes = {
        message: PropTypes.object.isRequired,
    };

    render() {
        const {message} = this.props;

        return (
            <div className='chat__mess'>
                <div className="avatar" style={{backgroundImage: `url(${message.avatar})`}}/>
                <div>
                    <div className="chat__head">
                        <div className="chat__head-name">{message.displayName}</div>
                        <div className="chat__head-date">{new Date(message.date).toLocaleTimeString()}</div>
                    </div>
                    <div className="chat__content">{message.text}</div>
                </div>
            </div>
        );
    }
}

