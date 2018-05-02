import React, {Component} from "react";
import PropTypes from 'prop-types';
import User from '../components/common/User.jsx';
import 'react-select/dist/react-select.css';

class ChatMessage extends Component {

    static propTypes = {
        key: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    state = {
        showDropDown: false
    };

    handleToggleUserDropdown(e) {
        let messages = document.getElementsByClassName("chat__message");
        for (let i = 0; i < messages.length; i++) {
            if (messages[i] === e.currentTarget) continue;
            messages[i].classList.remove('open')
        }
        this.setState({
            showDropDown: !this.state.showDropDown
        })
    }

    handleMuteUser(e) {
        e.stopPropagation();
        if (this.props.user.isAdmin || this.props.user.isModerator) {
            this.props.chatActions.blockUser({id: this.props.message.id, hours: e.target.id, state: !this.props.message.muted});
            this.setState({
                showDropDown: false
            })
        }
    }

    render() {
        const {message, key, user} = this.props;
        let {showDropDown} = this.state;

        return (
            (user.isAdmin || user.isModerator)
                ? <div onClick={this.handleToggleUserDropdown.bind(this)}
                       className={(!(message.isAdmin || message.isModerator))
                           ? (showDropDown) ? "chat__message user open" : "chat__message user"
                           : "chat__message"}
                       key={key}>
                    <User level={message.level || ''} name={message.displayName} image={message.avatar}
                          isModerator={message.isModerator} isAdmin={message.isAdmin}/>
                    {
                        (!message.muted)
                            ? <ul className="chat__dropdown">
                                <li id="1" onClick={this.handleMuteUser.bind(this)}>Mute for 1 hours</li>
                                <li id="24" onClick={this.handleMuteUser.bind(this)}>Mute for 1 day</li>
                                <li id="forever" onClick={this.handleMuteUser.bind(this)}>Mute for permanent</li>
                            </ul>
                            : <ul className="chat__dropdown">
                                <li id="unmute" onClick={this.handleMuteUser.bind(this)}>Unmute</li>
                            </ul>
                    }
                    <span className="message">{message.text}</span>
                </div>
                : <div className="chat__message" key={key}>
                    <User level={message.level || ''} name={message.displayName} image={message.avatar}
                          isModerator={message.isModerator} isAdmin={message.isAdmin}/>
                    <span className="message">{message.text}</span>
                </div>
        )
    }
}

export default ChatMessage