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
import InGameItemsModal from './Bots/InGameItemsModal.jsx';
import BotItemsModal from './Bots/BotItemsModal.jsx';
// import api from "../../api";
// import gameConfig from '../../../../config/game';
import adminConfig from '../../../../config/admin';


export default class Bots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            botsSelectType: '0',
            InGameItemsOptions: {
                bot: undefined,
                open: false,
                onSubmit: null,
                onClose: null,
            },
            BotItemsModalOptions: {
                bot: undefined,
                open: false,
                onSubmit: null,
                onClose: null,
            },
            gameType: 'csgo',
        };
    }

    async componentWillMount() {
        try {
            const {botsActions} = this.props;
            // const count = await api.bots.botsCount();
            // this.setState({countGames: count.amountGames});
            await botsActions.load(this.props.params.page || 0);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async selectPage(e) {
        try {
            e.preventDefault();
            const page = parseInt(e.target.dataset.number, 10);
            const {botsActions, bots} = this.props;
            await botsActions.load(page, bots.options);
            browserHistory.push(`/bots/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async nextListPages() {
        try {
            const {botsActions, bots} = this.props;
            // const pages = parseInt(this.state.countUsers / 10) * 10;
            // if (users.page > pages) return;
            const page = +bots.page + 10;
            await botsActions.load(page, bots.options);
            browserHistory.push(`/bots/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousListPages() {
        try {
            const {botsActions, bots} = this.props;
            if (+bots.page < 10) return;
            const page = +bots.page - 10;
            await botsActions.load(page, bots.options);
            browserHistory.push(`/bots/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }

    };

    async nextPage() {
        try {
            const {botsActions, bots} = this.props;
            // if (bots.page === +bots.startPage + 9) {
            //     return;
            // }
            const page = +bots.page + 1;
            await botsActions.load(page, bots.options);
            browserHistory.push(`/bots/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousPage() {
        try {
            const {botsActions, bots} = this.props;
            if (+bots.page === +0) {
                return;
            }

            const page = +bots.page - 1;
            await botsActions.load(page, bots.options);

            browserHistory.push(`/bots/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    // __renderSelectType() {
    //     const selectTypes = [];
    //     for (let key in adminConfig.GAMES_SELECT_TYPES) {
    //         selectTypes.push(
    //             <MenuItem value={key}
    //                       primaryText={adminConfig.GAMES_SELECT_TYPES[key].title}/>
    //         );
    //     }
    //     return selectTypes
    // }

    handleInGameItemsUpdate(bot) {
        this.setState({
            InGameItemsOptions:{
                open: true,
                bot: bot,
                onSubmit: ()=>{
                    this.setState({InGameItemsOptions:{open: false}})
                },
                onClose: ()=>{
                    this.setState({InGameItemsOptions:{open: false}})
                },
            }
        })
    };

    handleBotItemsUpdate(bot) {
        this.setState({
            BotItemsModalOptions:{
                open: true,
                bot: bot,
                onSubmit: ()=>{
                    this.setState({BotItemsModalOptions:{open: false}})
                },
                onClose: ()=>{
                    this.setState({BotItemsModalOptions:{open: false}})
                },
            }
        })
    };

    handleChangeGameType = () =>{
        this.setState({
            gameType: this.state.gameType === 'csgo' ? 'pubg' : 'csgo',
        })
    };


    render() {
        const {page, botsList} = this.props.bots;
        let bots = [];
        let pages = [];
        // console.log('Bots this.props', this.props);


        botsList.map((bot, idx) => {
            const centerStyle = {textAlign: 'center'};

            bots.push(
                <TableRow key={`bot-${idx}`}>
                    <TableRowColumn>{bot._id}</TableRowColumn>
                    <TableRowColumn>{bot.account_name}</TableRowColumn>
                    <TableRowColumn>{bot.enabled ? 'true' : 'false'}</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            label="Free items"
                            primary={true}
                            style={{margin: 12}}
                            onTouchTap={this.handleBotItemsUpdate.bind(this, bot)}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            label="In game items"
                            primary={true}
                            style={{margin: 12}}
                            onTouchTap={this.handleInGameItemsUpdate.bind(this, bot)}
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
                    <p>BOTS</p>
                </section>
                <RaisedButton
                    label={this.state.gameType}
                    primary={true}
                    style={{margin: 12}}
                    onTouchTap={this.handleChangeGameType}
                />

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Enabled</TableHeaderColumn>
                            <TableHeaderColumn>Free items</TableHeaderColumn>
                            <TableHeaderColumn>In game items</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={true}
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {bots}
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
                <BotItemsModal
                    gameType={this.state.gameType}
                    open={this.state.BotItemsModalOptions.open}
                    bot={this.state.BotItemsModalOptions.bot}
                    onSubmit={this.state.BotItemsModalOptions.onSubmit}
                    onClose={this.state.BotItemsModalOptions.onClose}
                />
                <InGameItemsModal
                    gameType={this.state.gameType}
                    open={this.state.InGameItemsOptions.open}
                    bot={this.state.InGameItemsOptions.bot}
                    onSubmit={this.state.InGameItemsOptions.onSubmit}
                    onClose={this.state.InGameItemsOptions.onClose}
                />
            </div>
        )
    }
}
