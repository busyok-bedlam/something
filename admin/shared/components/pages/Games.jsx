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
import adminConfig from '../../../../config/admin';


export default class Games extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            countGames: 0,
            gamesSelectType: '0',
        };
    }

    async componentWillMount() {
        try {
            const {gamesActions} = this.props;
            const count = await api.games.gamesCount();
            this.setState({countGames: count.amountGames});
            await gamesActions.load(this.props.params.page || 0);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async clear() {
        try {
            const {gamesActions} = this.props;
            const count = await api.games.gamesCount();
            this.setState({countGames: count.amountGames});
            await gamesActions.load(0);
            browserHistory.push(`/games`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async handleSelectType(event, index, value) {

        try {
            const {gamesActions, games} = this.props;
            games.options.gamesSelectType = value;
            this.setState({gamesSelectType: value});
            await gamesActions.load(0, games.options)
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async selectPage(e) {
        try {
            e.preventDefault();
            const page = parseInt(e.target.dataset.number, 10);
            const {gamesActions, games} = this.props;
            await gamesActions.load(page, games.options);
            browserHistory.push(`/games/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async nextListPages() {
        try {
            const {gamesActions, games} = this.props;
            // const pages = parseInt(this.state.countUsers / 10) * 10;
            // if (users.page > pages) return;
            const page = +games.page + 10;
            await gamesActions.load(page, games.options);
            browserHistory.push(`/games/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousListPages() {
        try {
            const {gamesActions, games} = this.props;
            if (+games.page < 10) return;
            const page = +games.page - 10;
            await gamesActions.load(page, games.options);
            browserHistory.push(`/games/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }

    };

    async nextPage() {
        try {
            const {gamesActions, games} = this.props;
            // if (games.page === +games.startPage + 9) {
            //     return;
            // }
            const page = +games.page + 1;
            await gamesActions.load(page, games.options);
            browserHistory.push(`/games/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousPage() {
        try {
            const {gamesActions, games} = this.props;
            if (+games.page === +0) {
                return;
            }

            const page = +games.page - 1;
            await gamesActions.load(page, games.options);

            browserHistory.push(`/games/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    __renderSelectType() {
        const selectTypes = [];
        for (let key in adminConfig.GAMES_SELECT_TYPES) {
            selectTypes.push(
                <MenuItem value={key}
                          primaryText={adminConfig.GAMES_SELECT_TYPES[key].title}/>
            );
        }
        return selectTypes
    }


    render() {
        const {page, gamesList} = this.props.games;
        let games = [];
        let pages = [];


        gamesList.map((game, idx) => {
            const centerStyle = {textAlign: 'center'};

            games.push(
                <TableRow key={`user-${idx}`}>
                    <TableRowColumn>{game._id}</TableRowColumn>
                    <TableRowColumn>{new Date(game.createdAt).toLocaleString()}</TableRowColumn>
                    <TableRowColumn>{game.owner}</TableRowColumn>
                    <TableRowColumn>{gameConfig.COLORS[game.ownerColor]}</TableRowColumn>
                    <TableRowColumn>{game.partner}</TableRowColumn>
                    <TableRowColumn>{gameConfig.COLORS[game.partnerColor]}</TableRowColumn>
                    <TableRowColumn>{game.betAmount}</TableRowColumn>
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
                        <p className="users-text">{`The number of games - ${this.state.countGames}. `}</p>
                        <RaisedButton
                            label="All games (clear)"
                            primary={true}
                            onTouchTap={::this.clear}
                        />
                    </div>
                    <div className="top-users">
                        <SelectField
                            floatingLabelText="Select Type"
                            value={this.state.gamesSelectType}
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
                            <TableHeaderColumn>Owner color</TableHeaderColumn>
                            <TableHeaderColumn>Partner</TableHeaderColumn>
                            <TableHeaderColumn>Partner color</TableHeaderColumn>
                            <TableHeaderColumn>Bet amount</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={true}
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {games}
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
            </div>
        )
    }
}
