import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField  from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import commonConfig from '../../../../../config/commonConfig';
import RaisedButton from 'material-ui/RaisedButton';
import TextField  from 'material-ui/TextField';

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
                <MenuItem value={key}
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
            <FlatButton
                label="Submit"
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
                    <h3>User:</h3>
                    {supportRequest.user ?
                        <div>
                            <h3>User name: {supportRequest.user.userName}</h3>
                            <h3>User   id: {supportRequest.user._id}</h3><br/>
                            <h3>{`Current balance: ${supportRequest.user.balance}`}</h3>
                            <hr/>
                        </div>
                        : <h3>---</h3>
                    }

                    <h3>{new Date(supportRequest.createdAt).toLocaleString()}</h3>
                    <h3>Caption: {supportRequest.caption}</h3>
                    <br/>
                    <p>{supportRequest.text}</p>
                    <hr/>

                    <SelectField
                        floatingLabelText="Change status"
                        value={this.state.value}
                        onChange={::this.handleValue}>
                        {this.__renderSelectType()}
                    </SelectField>

                    {/*<TextField*/}
                        {/*type="number"*/}
                        {/*value={this.state.value}*/}
                        {/*className="margin"*/}
                        {/*name="value"*/}
                        {/*id="newBalance"*/}
                        {/*hintText="Enter new balance"*/}
                        {/*onChange={::this.handleInput}*/}
                    {/*/>*/}
                </Dialog>
            </div>
        );
    }
}
