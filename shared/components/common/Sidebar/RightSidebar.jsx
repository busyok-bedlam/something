import React, {Component}   from "react";
import {connect}            from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes            from 'prop-types';
import ReactLoading         from 'react-loading';
import * as chatActions     from '../../../actions/chatActions';
import Scrollbar            from './../Scrollbar.jsx';
import Message              from './ChatMessage.jsx';
import ModalController      from './../../../lib/ModalController';

class RightSidebar extends Component {

    static propTypes = {
        chat: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        chatActions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.isUpdate = false;
    }

    state = {
        message: '',
    };

    componentWillUpdate() {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = this.refs.scrollbar.getValues();
        if (scrollHeight - scrollTop < clientHeight + 50) {
            this.isUpdate = true;
        }
    }

    componentDidUpdate() {
        if (this.isUpdate) {
            this.refs.scrollbar.scrollToBottom();
            this.isUpdate = false;
        }
    }

    handleInput(message) {
        this.setState({message});
        this.refs.scrollbar.scrollToBottom();
    }

    handleSubmit() {
        const {chatActions} = this.props;
        const {message} = this.state;
        chatActions.sendMessage(message);
        this.refs.scrollbar.scrollToBottom();
        this.setState({message: ''});
        this.refs.textarea.focus();
    }


    __renderMessages() {
        const {chat} = this.props;
        const {messages} = chat;
        const list = [];
        messages.forEach((message, key) => {
            list.push(
                <Message
                    key={key}
                    message={message}
                />
            )
        });
        return list;
    }

    render() {
        const {chat, user} = this.props;
        const {isLoading, usersOnline} = chat;
        const {isAuth} = user;

        return (
            <div>
                <div className='right-col__total'>
                    <h2>chat:</h2>
                    <div><i className="icon icon-users"/> <span>{usersOnline}</span></div>
                </div>
                <div className="chat" style={{height: 'calc(100vh - 313px)', position: 'relative'}}>
                    {isLoading &&
                    <ReactLoading
                        type="bubbles"
                        className="loader loader-abs"
                    />}
                    <Scrollbar ref="scrollbar">
                        <div className="chat__wrapper">
                            {this.__renderMessages()}
                        </div>
                    </Scrollbar>
                    <div
                        className="chat__textarea"
                        style={{filter: isAuth ? 'blur(0px)' : 'blur(4px)'}}>
                        <input
                            disabled={!isAuth}
                            ref="textarea"
                            value={this.state.message}
                            onChange={(e) => this.handleInput(e.target.value)}
                            placeholder="Write here"
                        />
                        <div className="chat__buttons">
                            <a onClick={()=>ModalController.openModal('TermsOfUsageModal')}>Terms of Usage</a>
                            <div className="chat__buttons-wrapper">
                                <i className="icon icon-smile"/>
                                <i
                                    onTouchTap={isAuth ? ::this.handleSubmit : () =>null}
                                    className="icon icon-send"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        chat,
        user,
    } = state;
    return {
        chat,
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch),
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(RightSidebar);

