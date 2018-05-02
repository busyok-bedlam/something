import React from 'react';
import {browserHistory} from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import Forward from 'material-ui/svg-icons/av/forward-10';
import Previous from 'material-ui/svg-icons/av/replay-10';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import api from "../../api";
import config from "./../../../../config/admin";
import TextField from 'material-ui/TextField';

export default class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            condition: 0,
            periodBlocked: [],
            periodMuted: [],
            value: 0,
            searchID: null,
            disabledSearchButton: true
        };
    }

    async componentWillMount() {
        try {
            const {usersActions} = this.props;
            const count = await api.user.userCount();
            this.setState({countUsers: count.amountUsers});
            await usersActions.load(this.props.params.page || 0);
        } catch (error) {
            console.error(error);
            console.error(error.message || error.toString());
        }
    }

    async selectPage(e) {
        try {
            e.preventDefault();
            const page = parseInt(e.target.dataset.number, 10);
            const {usersActions, users} = this.props;
            await usersActions.load(page, users.options);
            browserHistory.push(`/users/${page}`);
        } catch (error) {
            console.error(error);
            console.error(error.message || error.toString());
        }
    };

    async nextListPages() {
        try {
            const {usersActions, users} = this.props;
            let countPage = Math.ceil(this.state.countUsers/config.USERS_PER_PAGE);
            if (users.page + 10 >= countPage) return;
            const page = +users.page + 10;
            await usersActions.load(page, users.options);
            browserHistory.push(`/users/${page}`);
        } catch (error) {
            console.error(error);
            console.error(error.message || error.toString());
        }
    };

    async previousListPages() {
        try {
            const {usersActions, users} = this.props;
            if (+users.page < 10) return;
            const page = +users.page - 10;
            await usersActions.load(page, users.options);
            browserHistory.push(`/users/${page}`);
        } catch (error) {
            console.error(error);
            console.error(error.message || error.toString());
        }

    };

    async nextPage() {
        try {
            const {usersActions, users} = this.props;
            let countPage = Math.ceil(this.state.countUsers/config.USERS_PER_PAGE);
            if (users.page + 1 >= countPage) return;
            const page = +users.page + 1;
            await usersActions.load(page, users.options);
            browserHistory.push(`/users/${page}`);
        } catch (error) {
            console.error(error);
            console.error(error.message || error.toString());
        }
    };

    async previousPage() {
        try {
            const {usersActions, users} = this.props;
            if (+users.page === +0) {
                return;
            }

            const page = +users.page - 1;
            await usersActions.load(page, users.options);

            browserHistory.push(`/users/${page}`);
        } catch (error) {
            console.error(error);
            console.error(error.message || error.toString());
        }
    };

    handleBlockUser(id, st, idx, type) {
        let period;
        if(type == "blocked") period = this.state.periodBlocked[idx] ? this.state.periodBlocked[idx] : '1 day';
        if(type == "muted") period = this.state.periodMuted[idx] ? this.state.periodMuted[idx] : '1 hour';
        let blokedDate;
        switch (period) {
            case '1 hour':
                blokedDate = new Date(Date.now() + 60 * 60 * 1000);
                break;
            case '1 day':
                blokedDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                break;
            case '7 day':
                blokedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                break;
            case '30 day':
                blokedDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                break;
            default:
                blokedDate = 0;
        }
        this.props.usersActions.updateUser({
            id: id,
            type,
            state: !st,
            period: st ? 0 : blokedDate,
            page: this.props.params.page || 0
        });
    }

    handleChangeBlocked = (idx, event, index, value) => {
        let arr = this.state.periodBlocked;
        arr[idx] = value;
        this.setState({periodBlocked: arr});
    };

    handleChangeMuted = (idx, event, index, value) => {
        let arr = this.state.periodMuted;
        arr[idx] = value;
        this.setState({periodMuted: arr});
    };

    handleUpdateCredentials = (id, name, value) => {
        this.props.usersActions.updateUserCredentials({
            id: id,
            role: name,
            state: !value,
            page: this.props.params.page || 0
        });
    };

    handleChangeSearchID = (event) => {
        this.setState({
            searchID: event.target.value,
            disabledSearchButton: !(event.target.value.length >= 17)
        });
    };

    async handleFindUserByID() {
        try {
            const {usersActions} = this.props;
            // if (users.page + 1 >= countPage) return;
            await usersActions.findUserByID({id: this.state.searchID});
        } catch (error) {
            console.log(error);
            console.error(error.message || error.toString());
        }
    };

    render() {
        const {page, usersList} = this.props.users;
        let users = [];
        let pages = [];
        let countPage = Math.ceil(this.state.countUsers/config.USERS_PER_PAGE);
        let {disabledSearchButton} = this.state;

        usersList.map((user, idx) => {
            let dateBlocked = new Date(user.blockedToDate);
            let dateMuted = new Date(user.mutedToDate);
            let createdAt = new Date(user.createdAt);
            users.push(
                <TableRow key={`user-${idx}`}>
                    <TableRowColumn><a href={user.profileUrl} target="_blank">{user._id}</a></TableRowColumn>
                    <TableRowColumn>{user.displayName}</TableRowColumn>
                    <TableRowColumn>{user.balance}</TableRowColumn>
                    <TableRowColumn>{createdAt.toLocaleString("en-GB")}</TableRowColumn>
                    <TableRowColumn>
                        <Checkbox
                            checked={user.isAdmin}
                            onCheck={this.handleUpdateCredentials.bind(this, user._id, "isAdmin", user.isAdmin)}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <Checkbox
                            checked={user.isModerator}
                            onCheck={this.handleUpdateCredentials.bind(this, user._id, "isModerator", user.isModerator)}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <div className="td-button">
                            {user.blocked ?
                                <p className="date">{dateBlocked < new Date(2018, 0, 0) ? 'permanent' : dateBlocked.toLocaleString("en-GB")}</p>
                                :
                                <DropDownMenu
                                    value={this.state.periodBlocked[idx] ? this.state.periodBlocked[idx] : '1 day'}
                                    onChange={this.handleChangeBlocked.bind(this, idx)}
                                    autoWidth={true}>
                                    <MenuItem value={'1 day'} primaryText="Day"/>
                                    <MenuItem value={'7 day'} primaryText="Week"/>
                                    <MenuItem value={'30 day'} primaryText="Month"/>
                                    <MenuItem value={'permanent'} primaryText="Permanent"/>
                                </DropDownMenu>
                            }
                            <RaisedButton
                                className="button"
                                label={user.blocked ? "Unblock" : 'Block'}
                                secondary={!!user.blocked}
                                onClick={this.handleBlockUser.bind(this, user._id, user.blocked, idx, 'blocked')}
                            >
                            </RaisedButton>
                        </div>
                    </TableRowColumn>
                    <TableRowColumn>
                        <div className="td-button">
                            {user.muted ?
                                <p className="date">{dateMuted < new Date(2018, 0, 0) ? 'permanent' : dateMuted.toLocaleString("en-GB")}</p>
                                :
                                <DropDownMenu
                                    value={this.state.periodMuted[idx] ? this.state.periodMuted[idx] : '1 hour'}
                                    onChange={this.handleChangeMuted.bind(this, idx)}
                                    autoWidth={true}>
                                    <MenuItem value={'1 hour'} primaryText="Hour"/>
                                    <MenuItem value={'1 day'} primaryText="Day"/>
                                    <MenuItem value={'permanent'} primaryText="Permanent"/>
                                </DropDownMenu>
                            }
                            <RaisedButton
                                className="button"
                                label={user.muted ? "Unmute" : 'Mute'}
                                secondary={!!user.muted}
                                onClick={this.handleBlockUser.bind(this, user._id, user.muted, idx, 'muted')}
                            >
                            </RaisedButton>
                        </div>
                    </TableRowColumn>
                </TableRow>
            );
        });
        for (let i = (page < 5) ? 0 : page - 5; i < ((page < 5) ? ((countPage < 10) ? countPage : 10) : parseInt(page) + 5); i++) {
            pages.push(
                <p
                    key={`page-${i}`}
                    style={{
                        cursor: 'pointer',
                        border: i === page ? '1px solid black' : '',
                        borderRadius: '3px',
                        padding: '3px'
                    }}
                    data-number={i}
                    onTouchTap={::this.selectPage}>
                    {i + 1}
                </p>
            )
        }

        return (
            <div className="user-page">
                <section className="search-panel">
                    <div className="top-users">
                        <p className="users-text">{`The number of users of the site - ${this.state.countUsers}` + '  '}</p>
                    </div>
                </section>

                <h3>Find user by ID:</h3>
                <TextField
                    id="text-field-controlled"
                    value={this.state.searchID}
                    onChange={this.handleChangeSearchID}
                />
                <RaisedButton
                    className="button"
                    label="Find User"
                    disabled={disabledSearchButton}
                    onClick={this.handleFindUserByID.bind(this)}
                >
                </RaisedButton>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Display Name</TableHeaderColumn>
                            <TableHeaderColumn>Balance</TableHeaderColumn>
                            <TableHeaderColumn>Created at</TableHeaderColumn>
                            <TableHeaderColumn>Is admin<br />(set only color in chat)</TableHeaderColumn>
                            <TableHeaderColumn>Is moderator</TableHeaderColumn>
                            <TableHeaderColumn>Blocked</TableHeaderColumn>
                            <TableHeaderColumn>Muted</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={true}
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {users}
                    </TableBody>
                </Table>

                <div
                    id="linePages"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: '20px',
                        borderTop: '2px solid black'
                    }}>
                    <Previous
                        style={{cursor: 'pointer'}}
                        onTouchTap={::this.previousListPages}/>
                    <Left
                        style={{cursor: 'pointer'}}
                        onTouchTap={::this.previousPage}/>
                    {pages}
                    <Right
                        style={{cursor: 'pointer'}}
                        onTouchTap={::this.nextPage}/>
                    <Forward
                        style={{cursor: 'pointer'}}
                        onTouchTap={::this.nextListPages}/>
                </div>
            </div>
        )
    }
}
