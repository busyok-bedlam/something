import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {setCurrentUser} from '../../../actions/usersActions';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import api from "../../../api";
import config from '../../../../../config';

const ADMIN_NOTIFICATION = 'ADMIN_NOTIFICATION';

function mapStateToProps(state) {
    return {
        user: state.admin.currentUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentUser: bindActionCreators(setCurrentUser, dispatch)
    }
}


class UserPage extends React.Component {
    constructor(props) {
        super(props);

        const {
            blockExpired,
            level,
            isBlocked
        } = props.user.blockSettings;

        const date = new Date(blockExpired) > new Date() ? new Date(blockExpired) : new Date();

        this.state = {
            images: [],
            open: false,
            openNotification: false,
            type: '',
            notification: '',
            enableTime: false,
            blockExpired: date,
            level: level,
            isBlocked
        };

        api.get('user/view-image', {id: props.user._id})
            .then(res => {
                this.setState({
                    images: res.files
                });
            });
    }

    deleteDocument = (userID, fileName) => {
        api.delete('user/delete-image', {userID, fileName})
            .then(res => {
                this.setState({
                    images: res.files
                });
            });
    };

    verifyUser = (e) => {
        e.preventDefault();
        api.put('user/verify', {id: this.props.user._id})
            .then(() => browserHistory.push('/users'))
            .catch(err => console.error(err));
    };

    handleOpenBlock = (e) => {
        e.preventDefault();
        this.setState({open: true});
    };

    handleOpenNotification = (e) => {
        e.preventDefault();
        this.setState({openNotification: true});
    };

    blockUser = (e) => {
        e.preventDefault();

        const {
            blockExpired,
            level,
            isBlocked
        } = this.state;

        const data = {
            id: this.props.user._id,
            isBlocked,
            blockExpired,
            level,
        };

        api.put('user/block-user', data)
            .then((res) => {
                if (res.user) {
                    this.props.setCurrentUser(res.user);
                }
            })
            .catch(err => console.error(err));

        this.setState({
            open: false
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleCloseNotification = () => {
        this.setState({openNotification: false});
    };

    handleToggle = (e, toggled) => {
        this.setState({
            [e.target.name]: toggled,
        });
    };

    handleChangeDate = (e, date) => {
        this.setState({
            blockExpired: date,
        });
    };

    handleChangeTime = (e, time) => {
        const date = this.state.blockExpired;

        date.setHours(time.getHours());
        date.setMinutes(time.getMinutes());

        this.setState({
            blockExpired: date,
        });
    };

    handleChangeLevel = (e, index, level) => this.setState({level});

    handleChangeType = (e, index, type) => this.setState({type});

    handleChangeNotification = (e, notification) => this.setState({notification});

    sendNotification = (e) => {
        e.preventDefault();

        api.socket.send(JSON.stringify({
            type: 'ADMIN_NOTIFICATION',
            notificationType: this.state.type,
            text: this.state.notification,
            userID: this.props.user._id
        }));

        this.setState({
            openNotification: false,
            type: '',
            notification: ''
        });
    };

    render() {
        const details = [];
        const {user} = this.props;
        const style = {
            marginLeft: '-20px',
            textTransform: 'uppercase'
        };
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.blockUser}
            />,
        ];
        const actionsNotification = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseNotification}
            />,
            <FlatButton
                label="Send"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.sendNotification}
            />,
        ];

        function renderValue(value) {
            let content = [];

            if (Array.isArray(value)) {
                value.forEach((el, idx) => {
                    if (typeof el === 'object') {
                        content.push(
                            <div
                                style={style}
                                key={Math.random()}>
                                {idx + 1}:
                            </div>);
                        content = [...content, ...renderValue(el)];
                    } else {
                        content.push(<p key={el + idx}>{el}</p>);
                    }
                });
            } else if (value && typeof value === 'object') {
                Object.keys(value).forEach(field => {
                    if (typeof value[field] === 'object') {
                        content.push(
                            <div
                                style={style}
                                key={Math.random()}>
                                {field}:
                            </div>);
                        content = [...content, ...renderValue(value[field])]
                    } else {
                        content.push(<p
                            key={field + Math.random()}>{`${field}: ${value[field]}`}</p>);
                    }
                });
            } else if (typeof value === 'boolean') {
                content.push(<p
                    key={'bool-' + Math.random()}>{value ? 'Yes' : 'No'}</p>);
            } else {
                content.push(<p key={value + Math.random()}>{value}</p>);
            }

            return content;
        }

        details.push(
            <TableRow key="user-display">
                <TableRowColumn>
                    <p>ID: {user._id}</p>
                </TableRowColumn>
                <TableRowColumn>
                    <Avatar src={config['ORIGIN'] + user.avatar}/>
                </TableRowColumn>
                <TableRowColumn>
                    Name: {user.firstName + ' ' + user.lastName}
                </TableRowColumn>
            </TableRow>
        );

        for (let key in user) {
            if (key === 'passwordHash'
                || key === 'firstName'
                || key === 'lastName'
                || key === 'avatar'
                || key === '_id'
                || key === 'salt'
                || key === '__v') {
                continue;
            }

            details.push(
                <TableRow key={`property-${key}`}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn>
                        {
                            key === 'steamID'
                                ?
                                <a href={`https://steamcommunity.com/profiles/${user[key]}/`}
                                   target="_blank">
                                    User on Steam
                                </a>
                                : renderValue(user[key])
                        }
                    </TableRowColumn>
                </TableRow>
            );
        }

        const images = this.state.images.map(image => {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <img
                        key={image}
                        style={{width: '60%', paddingBottom: 30}}
                        src={`/static/uploads/${user._id}/${image}`} alt=""/>

                    <RaisedButton
                        label="Delete document"
                        icon={<DeleteIcon/>}
                        secondary={true}
                        onTouchTap={this.deleteDocument.bind(this, user._id, image)}
                    />
                </div>
            );
        });

        return (
            <div style={{
                width: '80%',
                margin: '20px auto',
                position: 'relative'
            }}>
                <Table selectable={false}>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {details}
                    </TableBody>
                </Table>

                <article>
                    {images}
                </article>

                <div>
                    <RaisedButton
                        label="Verify user"
                        primary={true}
                        style={{
                            display: user.isVerified ? 'none' : 'inline-block',
                            margin: 20
                        }}
                        onTouchTap={this.verifyUser}
                    />

                    <RaisedButton
                        label="Send notification"
                        primary={true}
                        style={{margin: 20}}
                        onTouchTap={this.handleOpenNotification}
                    />

                    <RaisedButton
                        label={this.props.user.blockSettings.isBlocked ? "Unblock" : "Block"}
                        primary={true}
                        style={{margin: 20}}
                        onTouchTap={this.handleOpenBlock}
                    />

                    <RaisedButton
                        label="Back to list"
                        primary={true}
                        style={{margin: 20}}
                        onTouchTap={() => browserHistory.push('/users')}
                    />
                </div>
                <RaisedButton
                    label="Back to list"
                    secondary={true}
                    icon={<ExitIcon/>}
                    style={{
                        position: 'absolute',
                        right: -70,
                        top: 0
                    }}
                    onTouchTap={() => browserHistory.push('/users')}
                />

                <Dialog
                    title={`Blocking user: ${user.firstName} ${user.lastName}`}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            marginBottom: 20,
                            width: '90%'
                        }}>
                            <div>
                                <Toggle
                                    name="isBlocked"
                                    label="Block/unblock"
                                    toggled={this.state.isBlocked}
                                    onToggle={this.handleToggle}
                                />
                            </div>
                            <SelectField
                                floatingLabelText="Level"
                                value={this.state.level}
                                onChange={this.handleChangeLevel}
                                disabled={!this.state.isBlocked}
                            >
                                <MenuItem value={3} primaryText="Level 3"/>
                                <MenuItem value={2} primaryText="Level 2"/>
                                <MenuItem value={1} primaryText="Level 1"/>
                            </SelectField>
                        </div>

                        <div style={{width: '50%', margin: '10px auto'}}>
                            <Toggle
                                label="Add expired date"
                                name="enableTime"
                                toggled={this.state.enableTime}
                                onToggle={this.handleToggle}
                            />
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '90%'
                        }}>

                            <DatePicker
                                onChange={this.handleChangeDate}
                                autoOk={true}
                                name="date"
                                defaultDate={this.state.blockExpired}
                                disableYearSelection={true}
                                disabled={!this.state.enableTime}
                                value={this.state.blockExpired}
                            />
                            <TimePicker
                                name="time"
                                hintText="Set time"
                                minutesStep={5}
                                defaultTime={this.state.blockExpired}
                                disabled={!this.state.enableTime}
                                onChange={this.handleChangeTime}
                                value={this.state.blockExpired}
                            />
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    actions={actionsNotification}
                    title={`Send notification to ${user.firstName} ${user.lastName}`}
                    modal={false}
                    open={this.state.openNotification}
                    onRequestClose={this.handleCloseNotification}
                >
                    <div>
                        <SelectField
                            floatingLabelText="Type notification"
                            value={this.state.type}
                            onChange={this.handleChangeType}
                        >
                            <MenuItem value="special"
                                      primaryText="Type special"/>
                            <MenuItem value="desktop"
                                      primaryText="Type desktop"/>
                        </SelectField>
                        <TextField
                            hintText="Input notification"
                            fullWidth={true}
                            onChange={this.handleChangeNotification}
                            value={this.state.notification}
                        />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);
