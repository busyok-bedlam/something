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
                            {value: 'eng', label: <div className={'chat__room'}><span>English</span><span>2211</span></div>},
                            {value: 'eng', label: <div className={'chat__room'}><span>English</span><span>2211</span></div>},
                            {value: 'tur', label: <div className={'chat__room'}><span>Turkish</span><span className='empty'>0</span></div>},
                        ]}
                    />
                </div>
            </div>
        );
    }
}

