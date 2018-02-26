import React from 'react';
import {browserHistory} from 'react-router';
import SelectField from 'material-ui/SelectField';
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
import TextField from 'material-ui/TextField';
import Forward from 'material-ui/svg-icons/av/forward-10';
import Previous from 'material-ui/svg-icons/av/replay-10';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import api from "../../api";
import adminConfig from '../../../../config/admin';
import UpdateBalanceModal from './Users/UpdateBalanceModal.jsx';
import BlockUserModal from './Users/BlockUserModal.jsx';
import UnblockUserModal from './Users/UnblockUserModal.jsx';

export default class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            countUsers: 0,
            usersSelectType: '0',
            inputs: {
                userName: undefined,
            },
            modalOptions: {
                user: undefined,
                open: false,
                onSubmit: null,
                onClose: null,
            },
            modalBlockOptions: {
                user: undefined,
                open: false,
                onSubmit: null,
                onClose: null,
            },
            modalUnblockOptions: {
                user: undefined,
                open: false,
                onSubmit: null,
                onClose: null,
            },
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
            alert(error.message || error.toString());
        }
    }

    async clear() {
        try {
            const {usersActions} = this.props;
            const count = await api.user.userCount();
            const {inputs} = this.state;
            inputs.userName = undefined;
            this.setState({countUsers: count.amountUsers, inputs});
            await usersActions.load(0);
            browserHistory.push(`/users`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async handleSelectType(event, index, value) {

        try {
            const {usersActions, users} = this.props;
            users.options.usersSelectType = value;
            this.setState({usersSelectType: value});
            await usersActions.load(0, users.options)
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    handleInputs(e) {
        const inputs = this.state.inputs;
        inputs[e.target.name] = e.target.value;
        this.setState({inputs});

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
            alert(error.message || error.toString());
        }
    };

    async nextListPages() {
        try {
            const {usersActions, users} = this.props;
            // const pages = parseInt(this.state.countUsers / 10) * 10;
            // if (users.page > pages) return;
            const page = +users.page + 10;
            await usersActions.load(page, users.options);
            browserHistory.push(`/users/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
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
            alert(error.message || error.toString());
        }

    };

    async nextPage() {
        try {
            const {usersActions, users} = this.props;
            if (users.page === +users.startPage + 9) {
                return;
            }
            const page = +users.page + 1;
            await usersActions.load(page, users.options);
            browserHistory.push(`/users/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
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
            alert(error.message || error.toString());
        }
    };

    // searchByID() {
    //     api.get('user/get-id', {id: this.textID.value})
    //         .then(res => {
    //             this.setState({
    //                 users: res.users,
    //                 pagesVisible: false
    //             })
    //         });
    // };

    async searchByName() {
        try {
            const {usersActions, users} = this.props;
            const {userName} = this.state.inputs;
            users.options.search = true;
            users.options.searchField = 'userName';
            users.options.searchValue = userName;
            await usersActions.load(0, users.options)
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    // handleUserDetails = (user, e) => {
    //     e.preventDefault();
    //
    //     this.props.adminActions.setCurrentUser(user);
    //
    //     browserHistory.push('/user/details');
    // };

    handleUpdateUserBalance(user) {
        this.setState({
            modalOptions:{
                open: true,
                user: user,
                onSubmit: async (user, value)=>{
                    try{
                        const {usersActions} = this.props;
                        await usersActions.updateBalance(user._id, value);
                        this.setState({modalOptions:{open: false}})
                    } catch (error){
                        console.error(error);
                        alert(error.message || error.toString());
                    }
                },
                onClose: ()=>{
                    this.setState({modalOptions:{open: false}})
                },
            }
        })
    };

    handleBlock(user) {
        this.setState({
            modalBlockOptions:{
                open: true,
                user: user,
                onSubmit: async (user, value)=>{
                    try{
                        const {usersActions} = this.props;
                        await usersActions.blockUser(user._id, value);
                        this.setState({modalBlockOptions:{open: false}})
                    } catch (error){
                        console.error(error);
                        alert(error.message || error.toString());
                    }
                },
                onClose: ()=>{
                    this.setState({modalBlockOptions:{open: false}})
                },
            }
        })
    };

    handleUnblock(user) {
        this.setState({
            modalUnblockOptions:{
                open: true,
                user: user,
                onSubmit: async (user)=>{
                    try{
                        const {usersActions} = this.props;
                        await usersActions.unblockUser(user._id);
                        this.setState({modalUnblockOptions:{open: false}})
                    } catch (error){
                        console.error(error);
                        alert(error.message || error.toString());
                    }
                },
                onClose: ()=>{
                    this.setState({modalUnblockOptions:{open: false}})
                },
            }
        })
    };

    __renderSelectType() {
        const selectTypes = [];
        for (let key in adminConfig.USERS_SELECT_TYPES) {
            selectTypes.push(
                <MenuItem value={key}
                          primaryText={adminConfig.USERS_SELECT_TYPES[key].title}/>
            );
        }
        return selectTypes
    }


    render() {
        const {page, usersList} = this.props.users;
        let users = [];
        let pages = [];

        usersList.map((user, idx) => {

            users.push(
                <TableRow key={`user-${idx}`}>
                    <TableRowColumn>{user._id}</TableRowColumn>
                    <TableRowColumn>
                        {`${user.firstName} ${user.lastName}`}
                    </TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{user.userName}</TableRowColumn>
                    <TableRowColumn
                        style={{width: 100}}>{Math.floor(user.balance)}</TableRowColumn>
                    <TableRowColumn>
                        {/*<RaisedButton*/}
                            {/*label="Details"*/}
                            {/*primary={true}*/}
                            {/*style={{margin: 12}}*/}
                            {/*onTouchTap={this.handleUserDetails.bind(this, user)}*/}
                        {/*/>*/}
                        <RaisedButton
                            label="Update balance"
                            primary={true}
                            style={{margin: 12}}
                            onTouchTap={this.handleUpdateUserBalance.bind(this, user)}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        {user.isBlocked ?
                            <RaisedButton
                                label="unblock"
                                secondary={true}
                                style={{margin: 12}}
                                onTouchTap={this.handleUnblock.bind(this, user)}
                            />
                            :
                            <RaisedButton
                                label="block user"
                                primary={true}
                                style={{margin: 12}}
                                onTouchTap={this.handleBlock.bind(this, user)}
                            />
                        }

                    </TableRowColumn>
                </TableRow>
            );
        });

        for (let i = (page < 5) ? 0 : page - 5; i < ((page < 5) ? 10 : parseInt(page) + 5); i++) {
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
            <div>
                <section className="search-panel">
                    <div className="top-users">
                        <p className="users-text">{`The number of users of the site - ${this.state.countUsers}.`}</p>
                        <RaisedButton
                            label="All users (clear)"
                            primary={true}
                            onTouchTap={::this.clear}
                        />
                    </div>
                    <div className="top-users">
                        {/*<TextField*/}
                            {/*id="searchID"*/}
                            {/*hintText="Enter ID"*/}
                            {/*className="margin"*/}
                        {/*/>*/}

                        {/*<RaisedButton*/}
                            {/*className="margin"*/}
                            {/*label="Search by ID"*/}
                            {/*primary={true}*/}
                            {/*onTouchTap={::this.searchByID}*/}
                        {/*/>*/}
                        <TextField
                            value={this.state.inputs.userName}
                            className="margin"
                            name="userName"
                            id="searchName"
                            hintText="Enter user name (part)"
                            onChange={::this.handleInputs}
                        />
                        <RaisedButton
                            className="margin"
                            label="Search by user name"
                            primary={true}
                            onTouchTap={::this.searchByName}
                        />
                        <SelectField
                            className="margin"
                            floatingLabelText="Select Type"
                            value={this.state.usersSelectType}
                            onChange={::this.handleSelectType}>
                            {this.__renderSelectType()}
                        </SelectField>
                    </div>
                </section>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Display Name</TableHeaderColumn>
                            <TableHeaderColumn>E-mail</TableHeaderColumn>
                            <TableHeaderColumn>User Name</TableHeaderColumn>
                            <TableHeaderColumn>Balance</TableHeaderColumn>
                            <TableHeaderColumn>Update balance</TableHeaderColumn>
                            <TableHeaderColumn>Block</TableHeaderColumn>
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
                        // display: this.state.pagesVisible ? 'flex' : 'none',
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
                <UpdateBalanceModal
                    open={this.state.modalOptions.open}
                    user={this.state.modalOptions.user}
                    onSubmit={this.state.modalOptions.onSubmit}
                    onClose={this.state.modalOptions.onClose}
                />
                <BlockUserModal
                    open={this.state.modalBlockOptions.open}
                    user={this.state.modalBlockOptions.user}
                    onSubmit={this.state.modalBlockOptions.onSubmit}
                    onClose={this.state.modalBlockOptions.onClose}
                />
                <UnblockUserModal
                    open={this.state.modalUnblockOptions.open}
                    user={this.state.modalUnblockOptions.user}
                    onSubmit={this.state.modalUnblockOptions.onSubmit}
                    onClose={this.state.modalUnblockOptions.onClose}
                />
            </div>
        )
    }
}
