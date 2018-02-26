import React, {Component} from "react";
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Scrollbar from '../common/Scrollbar.jsx';
import ModalController from '../../lib/ModalController';
import {Tabs, Tab} from 'material-ui/Tabs';
import SupportTab from './Tabs/SupportTab.jsx';
import FAQTab from './Tabs/FAQTab.jsx';
import PropTypes from 'prop-types';

let tabs = [
    {
        label: "FAQ",
        value: "FAQ",
        content: <FAQTab />
    },
    {
        label: "Contact us",
        value: "support",
        content: <SupportTab />
    }
];

class SupportModal extends Component {
    static propTypes = {
        modal: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.modal.tab || 'FAQ',
            open: true,
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    handleClose() {
        this.setState({open: false});
        setTimeout(ModalController.closeModal, 200);
    }

    renderTab(el) {
        let {label, value, content} = el;
        return (<Tab label={label} value={value} ref={value} key={value}
                     className={this.state.value === value ? 'tab__button tab__button-active' : 'tab__button'}>
                    <div style={{ height: 'calc(80vh - 200px)'}}>
                        <Scrollbar>
                            {content}
                        </Scrollbar>
                    </div>
                </Tab>)
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onRequestClose={::this.handleClose}
                overlayClassName={"modal__overlay"}
                contentClassName={"modal account modal-without_pad"}>
                <div onClick={::this.handleClose} className="modal__close"/>
                <div className="deposit__header deposit__header-green">
                    <h3>Support</h3>
                </div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    className={'tab'}
                    contentContainerClassName={'tab__content'}
                    tabItemContainerStyle={{
                        backgroundColor: 'transparent',
                        width: 'fit-content',
                        margin: '20px 40px 40px'
                    }}
                    inkBarStyle={{
                        width: '0',
                        height: '0'
                    }}
                >
                    {
                        tabs.map(el => this.renderTab(el))
                    }
                </Tabs>
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    const {
        modal,
    } = state;
    return {
        modal,
    };
}

export default connect(mapStateToProps)(SupportModal);