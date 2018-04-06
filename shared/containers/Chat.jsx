import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import * as chatActions from '../actions/chatActions';
import Select from 'react-select';
import Scrollbar from '../components/common/Scrollbar.jsx';
import User from '../components/common/User.jsx';
import {Picker} from 'emoji-mart';
import 'react-select/dist/react-select.css';
import PickerStyle from 'emoji-mart/css/emoji-mart.css';

class Chat extends Component {

    static propTypes = {
        chat: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        chatActions: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.isUpdate = false;
    }

    state = {
        message: '',
        showChat: false,
        hidden: true,
    };

    handleChange = (selectedOption) => {
        localStorage.setItem('chatRoomBlaze', selectedOption.value);
        this.props.chatActions.changeRoom(selectedOption.value);
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

    // For hiding chat on mobile
    handleShowChat() {
        this.setState({
            showChat: !this.state.showChat
        });
    }

    handleOnOpen() {
        this.setState({
            showChat: true
        });
    }

    __renderMessages() {
        const {chat} = this.props;
        const {messages} = chat;
        const list = [];
        if(messages.length > 0) {
            messages.forEach((message, key) => {
                list.push(
                    <div className="chat__message" key={key}>
                        <User level={message.level || ''} name={message.displayName} image={message.avatar}
                              isModerator={message.isModerator} isAdmin={message.isAdmin}/>
                        <span className="message">{message.text}</span>
                    </div>
                )
            });
        }
        return list;
    }

    handleChatMessage = (e) => {
        e.preventDefault();
        let message = this.textarea.value;
        if (!message || /^\s*$/.test(message)) {
            this.textarea.value = '';
        } else {
            this.textarea.value = '';
            this.props.chatActions.sendMessage(message);
            this.textarea.focus();
        }
    };

    componentDidUpdate() {
        // Scroll to bottom
        if (this.isUpdate) {
            this.refs.scrollbar.scrollToBottom();
            this.isUpdate = false;
        }
    }

    componentDidMount() {
        document.addEventListener('input', this.handleCursorPosition.bind(this), true);
        document.addEventListener('click', this.handleCursorPosition.bind(this), true);
    }

    componentWillUnmount() {
        document.addEventListener('input', this.handleCursorPosition.bind(this), true);
        document.addEventListener('click', this.handleCursorPosition.bind(this), true);
    }

    // Send on Enter press
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleChatMessage(e);
        }
    };

    // Handle emoji picker

    openEmojiPicker = () => {

        if (this.state.hidden) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({
            hidden: !this.state.hidden
        });
    };

    handleOutsideClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        } else {
            this.openEmojiPicker();
        }
    };

    handleEmojiPicker = (emoji, e) => {
        if (this.state.hidden) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        if (emoji.colons !== undefined) {
            const textareaStrParts = [
                `${this.textarea.value.substring(0, this.state.curserPositonStart)}`,
                ` ${emoji.native} `,
                `${this.textarea.value.substring(this.state.curserPositonStart, this.state.curserPositonEnd)}`,
            ];
            let textareaValue = textareaStrParts.join('');
            this.textarea.value = textareaValue;
            this.textarea.click();
            this.textarea.focus();
        }

        this.setState({
            hidden: !this.state.hidden
        });
    };

    handleCursorPosition(e) {
        if (e.target === this.textarea) {
            this.setState({
                curserPositonStart: e.target.selectionStart,
                curserPositonEnd: e.target.selectionEnd
            });
        }
    }


    render() {
        const {showChat} = this.state;
        const {usersOnline} = this.props.chat;

        return (
            <div className={(showChat) ? "chat" : "chat chat-hidden"}>
                <div className="chat__fixed" id='chat'>
                    <div className="chat__header">
                        <h2 onClick={this.handleShowChat.bind(this)}>Chat</h2>
                        <Select
                            name="form-field-name"
                            value={this.props.chat.room || 'eng'}
                            onOpen={this.handleOnOpen.bind(this)}
                            onChange={this.handleChange}
                            searchable={false}
                            clearable={false}
                            className='select'
                            optionClassName='select__options'
                            openOnFocus={false}
                            options={[
                                {
                                    value: 'eng',
                                    label: <div className={'chat__room'}><span>English</span><span
                                        className={(usersOnline.eng === 0) ? 'empty' : 0}>{usersOnline.eng}</span></div>
                                },
                                {
                                    value: 'tur',
                                    label: <div className={'chat__room'}><span>Turkish</span><span
                                        className={(usersOnline.tur === 0) ? 'empty' : 0}>{usersOnline.tur}</span></div>
                                },
                            ]}
                        />
                    </div>
                    <div className="chat__wrapper">
                        <div style={{height: 'calc(100vh - 40.5rem)'}} className='fix-scroll-margin'>
                            <Scrollbar ref="scrollbar">
                                {this.__renderMessages()}
                            </Scrollbar>
                        </div>
                        <div className="chat__textarea">
                            <input ref={textarea => this.textarea = textarea}
                                   onKeyUp={this.handleKeyPress}
                                   maxLength={255}
                                   wrap="hard"
                                   placeholder='Type here'/>
                            <div className="chat__buttons">
                                <button onClick={this.handleEmojiPicker}><i className="icon-smile"/></button>
                                <button onClick={this.handleChatMessage}><i className="icon-send"/></button>
                                <div ref={node => (this.node = node)}>
                                    {!this.state.hidden &&
                                    <Picker
                                        style={{PickerStyle,
                                            position: 'absolute',
                                            right: '0px',
                                            bottom: '87px',
                                            width: '320px',
                                        }}
                                        title='Pick Emoji'
                                        color={'#44b982'}
                                        perLine={7}
                                        include={this.state.include}
                                        onClick={this.handleEmojiPicker}
                                        set='emojione'
                                        showPreview={false}
                                    />
                                    }
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);