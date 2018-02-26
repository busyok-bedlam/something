import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField  from 'material-ui/TextField';

export default class FaqCreateModal extends React.Component {


    state = {
        title: null,
        text: null,
    };

    handleClose() {
        const {onClose} = this.props;
        onClose && onClose();
    }

    handleSubmit() {
        const {onSubmit} = this.props;
        const {title, text} = this.state;
        onSubmit && onSubmit(title, text);
    }

    handleInput(e) {
        const data = {};
        data[e.target.name] = e.target.value;
        this.setState(data);
    }

    render() {
        const {open} = this.props;

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={::this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={::this.handleSubmit}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="FAQ create"
                    actions={actions}
                    modal={true}
                    open={open}>
                    <TextField
                        value={this.state.title}
                        className="margin"
                        name="title"
                        floatingLabelText="FAQ Title"
                        floatingLabelFixed={true}
                        onChange={::this.handleInput}
                    />
                    <hr/>
                    <TextField
                        value={this.state.text}
                        className="margin"
                        name="text"
                        floatingLabelText="FAQ Text"
                        floatingLabelFixed={true}
                        multiLine={true}
                        onChange={::this.handleInput}
                        style={{width: '100%'}}
                    />
                </Dialog>
            </div>
        );
    }
}
