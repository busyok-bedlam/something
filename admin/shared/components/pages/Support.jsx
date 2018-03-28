import React from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import Forward from 'material-ui/svg-icons/av/forward-10';
import Previous from 'material-ui/svg-icons/av/replay-10';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import api from "../../api";
import gameConfig from '../../../../config/crash';
import adminConfig from '../../../../config/admin';
import SupportInfoModal from './Support/SupportInfoModal.jsx';


export default class Support extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            countSupports: 0,
            supportsSelectType: '0',
            modalOptions: {
                open: false,
                supportRequest: null,
                onSubmit: null,
                onClose: null,
            }
        };
    }

    async componentWillMount() {
        try {
            const {supportsActions} = this.props;
            const count = await api.supports.supportsCount();
            this.setState({countSupports: count.amountSupports});
            await supportsActions.load(this.props.params.page || 0);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async clear() {
        try {
            const {supportsActions} = this.props;
            const count = await api.supports.supportsCount();
            this.setState({countSupports: count.amountSupports});
            await supportsActions.load(0);
            browserHistory.push(`/support`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    handleSupportRequestDetails(supportRequest) {
        this.setState({
            modalOptions:{
                open: true,
                supportRequest: supportRequest,
                onSubmit: async (supportRequest, value)=>{
                    try{
                        if(value){
                            const {supportsActions} = this.props;
                            await supportsActions.updateSupportStatus(supportRequest._id, value);
                        }
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

    async handleSelectType(event, index, value) {

        try {
            const {supportsActions, supports} = this.props;
            supports.options.supportsSelectType = value;
            this.setState({supportsSelectType: value});
            await supportsActions.load(0, supports.options)
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async selectPage(e) {
        try {
            e.preventDefault();
            const page = parseInt(e.target.dataset.number, 10);
            const {supportsActions, supports} = this.props;
            await supportsActions.load(page, supports.options);
            browserHistory.push(`/support/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async nextListPages() {
        try {
            const {supportsActions, supports} = this.props;
            // const pages = parseInt(this.state.countUsers / 10) * 10;
            // if (users.page > pages) return;
            const page = +supports.page + 10;
            await supportsActions.load(page, supports.options);
            browserHistory.push(`/support/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousListPages() {
        try {
            const {supportsActions, supports} = this.props;
            if (+supports.page < 10) return;
            const page = +supports.page - 10;
            await supportsActions.load(page, supports.options);
            browserHistory.push(`/support/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }

    };

    async nextPage() {
        try {
            const {supportsActions, supports} = this.props;
            // if (supports.page === +supports.startPage + 9) {
            //     return;
            // }
            const page = +supports.page + 1;
            await supportsActions.load(page, supports.options);
            browserHistory.push(`/support/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousPage() {
        try {
            const {supportsActions, supports} = this.props;
            if (+supports.page === +0) {
                return;
            }

            const page = +supports.page - 1;
            await supportsActions.load(page, supports.options);

            browserHistory.push(`/support/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    __renderSelectType() {
        const selectTypes = [];
        for (let key in adminConfig.SUPPORTS_SELECT_TYPES) {
            selectTypes.push(
                <MenuItem value={key}
                          primaryText={adminConfig.SUPPORTS_SELECT_TYPES[key].title}/>
            );
        }
        return selectTypes
    }


    render() {
        const {page, supportsList} = this.props.supports;
        let supports = [];
        let pages = [];


        supportsList.map((supportReq, idx) => {
            const centerStyle = {textAlign: 'center'};

            supports.push(
                <TableRow key={`user-${idx}`}>
                    <TableRowColumn>{supportReq._id}</TableRowColumn>
                    <TableRowColumn>{new Date(supportReq.createdAt).toLocaleString()}</TableRowColumn>
                    <TableRowColumn>{supportReq.user ? supportReq.user._id : '---'}</TableRowColumn>
                    <TableRowColumn>{supportReq.caption}</TableRowColumn>
                    <TableRowColumn>{supportReq.status}</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            label="Details"
                            primary={true}
                            style={{margin: 12}}
                            onTouchTap={this.handleSupportRequestDetails.bind(this, supportReq)}
                        />
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
                        border: i == page ? '1px solid black' : '',
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
                        <p className="users-text">{`The number of support requests - ${this.state.countSupports}. `}</p>
                        <RaisedButton
                            label="All support requests (clear)"
                            primary={true}
                            onTouchTap={::this.clear}
                        />
                    </div>
                    <div className="top-users">
                        <SelectField
                            floatingLabelText="Select Type"
                            value={this.state.supportsSelectType}
                            onChange={::this.handleSelectType}>
                            {this.__renderSelectType()}
                        </SelectField>
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
                        {/*<TextField*/}
                        {/*className="margin"*/}
                        {/*name="userName"*/}
                        {/*id="searchName"*/}
                        {/*hintText="Enter user name (part)"*/}
                        {/*onChange={::this.handleInputs}*/}
                        {/*/>*/}
                        {/*<RaisedButton*/}
                        {/*className="margin"*/}
                        {/*label="Search by user name"*/}
                        {/*primary={true}*/}
                        {/*onTouchTap={::this.searchByName}*/}
                        {/*/>*/}
                    </div>
                </section>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Created at</TableHeaderColumn>
                            <TableHeaderColumn>Owner</TableHeaderColumn>
                            <TableHeaderColumn>Caption</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Details</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={true}
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {supports}
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
                <SupportInfoModal
                    open={this.state.modalOptions.open}
                    supportRequest={this.state.modalOptions.supportRequest}
                    onSubmit={this.state.modalOptions.onSubmit}
                    onClose={this.state.modalOptions.onClose}
                />
            </div>
        )
    }
}
