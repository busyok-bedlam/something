import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField  from 'material-ui/TextField';

export default class FaqInfoModal extends React.Component {


    state = {
        text: undefined,
        title: undefined,
    };

    handleClose() {
        const {onClose} = this.props;
        this.setState({title: undefined, text: undefined})
        onClose && onClose();
    }

    handleSubmit() {
        const {onSubmit, faq} = this.props;
        const {title, text} = this.state;
        onSubmit && onSubmit(title || faq.title, text || faq.text, faq);
    }

    handleInput(e) {
        const data = {};
        data[e.target.name] = e.target.value;
        this.setState(data);
    }


    render() {
        const {open, faq} = this.props;

        if (!faq) {
            return null;
        }

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
                    title="FAQ info"
                    actions={actions}
                    modal={true}
                    open={open}>
                    <h3>Created
                        at: {new Date(faq.createdAt).toLocaleString()}</h3>
                    <TextField
                        value={this.state.title || faq.title}
                        className="margin"
                        name="title"
                        floatingLabelText="FAQ Title"
                        floatingLabelFixed={true}
                        onChange={::this.handleInput}
                    />
                    <hr/>
                    <TextField
                        value={this.state.text || faq.text}
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
