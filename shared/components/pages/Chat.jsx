import React, {Component} from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Chat extends Component {
    state = {
        selectedOption: 'eng'
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption: selectedOption.value});
    };


    render() {
        const {selectedOption} = this.state;
        return (
            <div className="chat">
                <div className="chat__header">
                    <h2>Chat</h2>
                    <Select
                        name="form-field-name"
                        value={selectedOption}
                        onChange={this.handleChange}
                        searchable={false}
                        clearable={false}
                        className='select'
                        optionClassName='select__options'
                        openOnFocus={true}
                        options={[
                            {
                                value: 'eng',
                                label: <div className={'chat__room'}><span>English</span><span>2211</span></div>
                            },
                            {
                                value: 'eng',
                                label: <div className={'chat__room'}><span>English</span><span>2211</span></div>
                            },
                            {
                                value: 'tur',
                                label: <div className={'chat__room'}><span>Turkish</span><span
                                    className='empty'>0</span></div>
                            },
                        ]}
                    />
                </div>
                <div className="chat__wrapper">
                    <div className="chat__message">
                        <span className="avatar" style={{backgroundImage: 'url("./static/images/user.png")'}}/>
                        <span className="user__level">11</span>
                        <span className="name">ConorMcGregor:</span>
                        <span className="message">
                            orem ipsum dolor sit amet, consecte
                        </span>
                    </div>
                    <div className="chat__message">
                        <span className="avatar" style={{backgroundImage: 'url("./static/images/user.png")'}}/>
                        <span className="user__level user__level-1 icon-fire">11</span>
                        <span className="name">ConorMcGregor:</span>
                        <span className="message">
                            orem ipsum dolor sit amet, consecte
                        </span>
                    </div>
                    <div className="chat__message">
                        <span className="avatar" style={{backgroundImage: 'url("./static/images/user.png")'}}/>
                        <span className="user__level user__level-2 icon-fire">11</span>
                        <span className="name">ConorMcGregor:</span>
                        <span className="message">
                            orem ipsum dolor sit amet, consecte
                        </span>
                    </div>
                    <div className="chat__message admin">
                        <span className="avatar" style={{backgroundImage: 'url("./static/images/user.png")'}}/>
                        <span className="name">[ADMIN] ConorMcGregor:</span>
                        <span className="message">
                            orem ipsum dolor sit amet, consecte
                        </span>
                    </div>
                    <div className="chat__message moderator">
                        <span className="avatar" style={{backgroundImage: 'url("./static/images/user.png")'}}/>
                        <span className="name">[MODERATOR] ConorMcGregor</span>:
                        <span className="message">
                            orem ipsum dolor sit amet, consecte
                        </span>
                    </div>
                    <div className="chat__textarea">
                        <textarea placeholder='Type here' />
                        <div className="chat__buttons">
                            <button><i className="icon-smile" /></button>
                            <button><i className="icon-send" /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

