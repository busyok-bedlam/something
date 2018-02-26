import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField  from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import adminConfig from '../../../../../config/admin';

export default class UpdateBalanceModal extends React.Component {


    state = {
        value: '0',
    };

    handleClose() {
        const {onClose} = this.props;
        onClose && onClose(this.state.value)
    }

    handleSubmit() {
        const {onSubmit, user} = this.props;
        onSubmit && onSubmit(user, this.state.value)
    }

    async handleValue(event, index, value) {
            this.setState({value});
    }

    __renderSelectType() {
        const selectTypes = [];
        for (let key in adminConfig.USER_BLOCK_TIME) {
            selectTypes.push(
                <MenuItem value={key}
                          primaryText={adminConfig.USER_BLOCK_TIME[key].title}/>
            );
        }
        return selectTypes
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
                onClick={::this.handleSubmit}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Modal Dialog" onClick={this.handleOpen}/>
                <Dialog
                    title="Block user"
                    actions={actions}
                    modal={true}
                    open={open}>
                    <h3>User name: {user.userName}</h3>
                    <h3>User   id: {user._id}</h3><br/>
                    <h3>{`Current balance: ${user.balance}`}</h3>
                    <hr/>
                    <SelectField
                    floatingLabelText="Select time"
                    value={this.state.value}
                    onChange={::this.handleValue}>
                        {this.__renderSelectType()}
                    </SelectField>
                </Dialog>
            </div>
        );
    }
}
