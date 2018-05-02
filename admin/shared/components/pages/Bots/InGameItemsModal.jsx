import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import api from "../../../api";

export default class InGameItemsModal extends React.Component {


    state = {
        items: [],
        selected: [],
        value: '0',
    };

    async componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            try{
                let res = await api.bots.botInGameItems({id: nextProps.bot._id, gameType: nextProps.gameType});
                this.setState({items: res.items});
            } catch (error){
                console.error(error);
                alert(error.message || error.toString());
            }
        }
    }

    handleClose() {
        const {onClose} = this.props;
        onClose && onClose();
    }

    handleSubmit() {
        const {onSubmit, bot, gameType} = this.props;
        try{
            api.bots.deleteItems({id: bot._id, items: this.state.selected, gameType: gameType});
        } catch (error){
            console.error(error);
            alert(error.message || error.toString());
        }
        onSubmit && onSubmit();
    }

    handleRowSelection = (selectedRows) => {
        let selected = [];
        if (selectedRows === 'all'){
            let items = this.state.items;
            for (let i = 0; i < items.length; i++) {
                selected.push(items[i]._id);
            }
        } else if (selectedRows !== 'none') {
            let items = this.state.items;
            for ( let index in selectedRows) {
                let i = selectedRows[index];
                selected.push(items[i]._id);
            }
        }
        this.setState({selected});
    };

    render() {
        const {open, bot} = this.props;
        const items = this.state.items;
        const listItems = items.map((item, idx) => {
            return (
                <TableRow key={`item-${idx}`}>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>{item.price}</TableRowColumn>
                </TableRow>
            )}
        );
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
                {/*<RaisedButton label="Modal Dialog" onClick={this.handleOpen}/>*/}
                <Dialog
                    title="Bot's in game items"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    open={open}>
                    <h3>Bot name: {bot ? bot.account_name : ''}</h3>
                    <h4>Select items to remove from game</h4>
                    <Table selectable={true}
                           multiSelectable={true}
                           onRowSelection={this.handleRowSelection}>
                        <TableHeader adjustForCheckbox={true}
                                     displaySelectAll={true}
                                     enableSelectAll={true}>
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Price</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            stripedRows={true}
                            displayRowCheckbox={true}
                            showRowHover={true}
                            deselectOnClickaway={false}>
                            {listItems}
                        </TableBody>
                    </Table>
                </Dialog>
            </div>
        );
    }
}
