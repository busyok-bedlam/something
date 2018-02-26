import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField  from 'material-ui/TextField';

export default class UpdateBalanceModal extends React.Component {


    state = {
        disabled: true,
        value: undefined,
    };

    handleClose() {
        const {onClose} = this.props;
        onClose && onClose(this.state.value)
    }

    handleSubmit() {
        const {onSubmit, user} = this.props;
        onSubmit && onSubmit(user, this.state.value)
    }

    handleInput(e) {
        this.setState({
            value: e.target.value,
            disabled: (e.target.value.length) ? (false) : (true),
        });
    }


    render() {
        const {open, user} = this.props;
        if(!user){
            return null;
        }

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={::this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.disabled}
                onClick={::this.handleSubmit}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Modal Dialog" onClick={this.handleOpen}/>
                <Dialog
                    title="Update balance"
                    actions={actions}
                    modal={true}
                    open={open}>
                    <h3>User name: {user.userName}</h3>
                    <h3>User   id: {user._id}</h3><br/>
                    <h3>{`Current balance: ${user.balance}`}</h3>
                    <hr/>
                    <TextField
                        type="number"
                        value={this.state.value}
                        className="margin"
                        name="value"
                        id="newBalance"
                        hintText="Enter new balance"
                        onChange={::this.handleInput}
                    />
                </Dialog>
            </div>
        );
    }
}
