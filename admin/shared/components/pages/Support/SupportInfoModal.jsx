import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton  from 'material-ui/RaisedButton';
import SelectField  from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import commonConfig from '../../../../../config/commonConfig';

export default class SupportInfoModal extends React.Component {

    state = {
        value: undefined,
    };

    handleClose() {
        const {onClose} = this.props;
        onClose && onClose();
    }

    handleSubmit() {
        const {onSubmit, supportRequest} = this.props;
        const {value} = this.state;
        onSubmit && onSubmit(supportRequest, value)
    }

    async handleValue(event, index, value) {
        this.setState({value});
    }

    __renderSelectType() {
        const selectTypes = [];
        for (let key in commonConfig.SUPPORT_STATUS) {
            selectTypes.push(
                <MenuItem value={key} key={key}
                          primaryText={commonConfig.SUPPORT_STATUS[key]}/>
            );
        }
        return selectTypes
    }


    render() {
        const {open, supportRequest} = this.props;
        if(!supportRequest){
            return null;
        }

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={::this.handleClose}
            />,
            <RaisedButton
                label="Save"
                primary={true}
                disabled={this.state.disabled}
                onClick={::this.handleSubmit}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Support request"
                    actions={actions}
                    modal={true}
                    open={open}>
                    <h4>Owner: </h4><p>{supportRequest.userID}</p>
                    <h4>Email: </h4><p><a href={"mailto:" + supportRequest.email}>{supportRequest.email}</a></p>
                    <h4>Steam link: </h4><p><a href={supportRequest.steamLink}>{supportRequest.userID}</a></p>
                    <h4>Created at: </h4><p>{new Date(supportRequest.createdAt).toLocaleString()}</p>
                    <hr/>
                    <h4>Support Request: </h4><p>{supportRequest.text}</p>
                    <SelectField
                        floatingLabelText="Change status"
                        value={this.state.value || supportRequest.status}
                        onChange={::this.handleValue}>
                        {this.__renderSelectType()}
                    </SelectField>
                </Dialog>
            </div>
        );
    }
}
