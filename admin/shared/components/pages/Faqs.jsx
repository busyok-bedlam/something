import React from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
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
import FaqInfoModal from './Faqs/FaqInfoModal.jsx';
import FaqCreateModal from './Faqs/FaqCreateModal.jsx';


export default class Faqs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalInfoOptions:{
                open: false,
                faq: null,
                onSubmit: null,
                onClose: null,
            },
            modalCreateOptions:{
                open: false,
                onSubmit: null,
                onClose: null,
            },
        };
    }

    async componentWillMount() {
        try {
            const {faqsActions} = this.props;
            await faqsActions.load(this.props.params.page || 0);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async clear() {
        try {
            const {faqsActions} = this.props;
            await faqsActions.load(0);
            browserHistory.push(`/faqs`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    handleCreateFaq(){
        this.setState({
            modalCreateOptions:{
                open: true,
                onSubmit: async (title, text)=>{
                    try{
                        const {faqsActions} = this.props;
                        await faqsActions.createFaq(title, text);
                        this.setState({
                            modalCreateOptions:{open: false}
                        });
                    } catch (error){
                        console.error(error);
                        alert(error.message || error.toString());
                    }
                },
                onClose:()=>{
                    this.setState({
                        modalCreateOptions: {open: false}
                    })
                }
            }
        });
    }

    handleDetailsFaq(faq){
        this.setState({
            modalInfoOptions:{
                open: true,
                faq: faq,
                onSubmit: async (title, text, faq)=>{
                    try{
                        const {faqsActions} = this.props;
                        await faqsActions.updateFaq(title, text, faq._id);
                        this.setState({
                            modalInfoOptions:{open: false}
                        });
                    } catch (error){
                        console.error(error);
                        alert(error.message || error.toString());
                    }
                },
                onClose:()=>{
                    this.setState({
                        modalInfoOptions: {open: false}
                    })
                }
            }
        });
    }

    async handleDelete(faqID){
        try{
            const {faqsActions} = this.props;
            await faqsActions.deleteFaq(faqID);
        } catch (error){
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    async selectPage(e) {
        try {
            e.preventDefault();
            const page = parseInt(e.target.dataset.number, 10);
            const {faqsActions, faqs} = this.props;
            await faqsActions.load(page, faqs.options);
            browserHistory.push(`/faqs/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async nextListPages() {
        try {
            const {faqsActions, faqs} = this.props;
            // const pages = parseInt(this.state.countUsers / 10) * 10;
            // if (users.page > pages) return;
            const page = +faqs.page + 10;
            await faqsActions.load(page, faqs.options);
            browserHistory.push(`/faqs/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousListPages() {
        try {
            const {faqsActions, faqs} = this.props;
            if (+faqs.page < 10) return;
            const page = +faqs.page - 10;
            await faqsActions.load(page, faqs.options);
            browserHistory.push(`/faqs/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }

    };

    async nextPage() {
        try {
            const {faqsActions, faqs} = this.props;
            // if (faqs.page === +faqs.startPage + 9) {
            //     return;
            // }
            const page = +faqs.page + 1;
            await faqsActions.load(page, faqs.options);
            browserHistory.push(`/faqs/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };

    async previousPage() {
        try {
            const {faqsActions, faqs} = this.props;
            if (+faqs.page === +0) {
                return;
            }

            const page = +faqs.page - 1;
            await faqsActions.load(page, faqs.options);

            browserHistory.push(`/faqs/${page}`);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
    };


    render() {
        const {page, faqsList} = this.props.faqs;
        let faqs = [];
        let pages = [];


        faqsList.map((faq, idx) => {
            const centerStyle = {textAlign: 'center'};

            faqs.push(
                <TableRow key={`user-${idx}`}>
                    <TableRowColumn>{faq._id}</TableRowColumn>
                    <TableRowColumn>{new Date(faq.createdAt).toLocaleString()}</TableRowColumn>
                    <TableRowColumn>{faq.title}</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            className="margin"
                            label="details"
                            primary={true}
                            onTouchTap={this.handleDetailsFaq.bind(this, faq)}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            className="margin"
                            label="delete"
                            secondary={true}
                            onTouchTap={this.handleDelete.bind(this, faq._id)}
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
                        <RaisedButton
                            label="All faqs (clear)"
                            primary={true}
                            onTouchTap={::this.clear}
                        />
                    </div>
                    <div className="top-users">

                        <RaisedButton
                        className="margin"
                        label="create faq"
                        primary={true}
                        onTouchTap={::this.handleCreateFaq}
                        />

                    </div>
                </section>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Created at</TableHeaderColumn>
                            <TableHeaderColumn>Title</TableHeaderColumn>
                            <TableHeaderColumn>Details</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={true}
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {faqs}
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
                <FaqInfoModal
                    open={this.state.modalInfoOptions.open}
                    faq={this.state.modalInfoOptions.faq}
                    onSubmit={this.state.modalInfoOptions.onSubmit}
                    onClose={this.state.modalInfoOptions.onClose}
                />
                <FaqCreateModal
                    open={this.state.modalCreateOptions.open}
                    onSubmit={this.state.modalCreateOptions.onSubmit}
                    onClose={this.state.modalCreateOptions.onClose}
                />
            </div>
        )
    }
}
