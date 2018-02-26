import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class UnblockUserModal extends React.Component {

    handleClose() {
        const {onClose} = this.props;
        onClose && onClose(this.state.value);
    }

    handleSubmit() {
        const {onSubmit, user} = this.props;
        onSubmit && onSubmit(user);
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
                label="Unblock"
                primary={true}
                onClick={::this.handleSubmit}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Unblock user"
                    actions={actions}
                    modal={true}
                    open={open}>
                    <h3>User name: {user.userName}</h3>
                    <h3>User   id: {user._id}</h3><br/>
                    <h3>{`Current balance: ${user.balance}`}</h3>
                    <h3>{`Blocked to: ${new Date(user.blockedTime).toLocaleString()}`}</h3>
                </Dialog>
            </div>
        );
    }
}
