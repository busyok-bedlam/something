import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../actions/userActions";
import Header from "./Header.jsx";
import Footer from "./../components/common/Footer.jsx";
import {ToastContainer} from 'react-toastify';
import LoadingScreenComponent, {LoadingScreen} from '../lib/LoadingScreen';
import Socket from "../lib/commonWS";
import ChatSocket from '../lib/chatWS';
import "react-toastify/dist/ReactToastify.min.css";
import LeftSidebar from './../components/common/Sidebar/LeftSidebar.jsx';
import RightSidebar from './../components/common/Sidebar/RightSidebar.jsx';
import Scrollbar from './../components/common/Scrollbar.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from "react-tap-event-plugin";
import ModalController from '../lib/ModalController';
import '../components/modal';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    userAgent: process.env.BROWSER ? navigator.userAgent : 'false',
});

class App extends Component {
    static propTypes = {
        location: PropTypes.object,
        routes: PropTypes.array,
        children: PropTypes.object,
        history: PropTypes.object,
        route: PropTypes.object.isRequired,
        modal: PropTypes.object.isRequired,
        loadingScreen: PropTypes.object,
    };

    async componentDidMount() {
        try {
            // Socket.start();
            ChatSocket.start();
            const {userActions} = this.props;
            await userActions.info();
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString())
        }
    }

    render() {
        const {modal} = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="app-container">
                    <LoadingScreenComponent
                        color="white"
                        className="loader"
                        open={this.props.loadingScreen.open}/>
                    <div style={{zIndex: 2000}}>
                        <ToastContainer/>
                    </div>
                    <Header {...this.props} />
                    <main className="main-wrapper">
                        <aside ref='leftNav'
                               id='leftNav'>
                            <LeftSidebar/>
                        </aside>
                        <section className="center-col" style={{height: 'calc(100vh - 100px)'}}>
                            <Scrollbar>
                                {this.props.children}
                            </Scrollbar>
                        </section>
                        <aside
                               ref='rightNav'
                               id='rightNav'>
                            <div className="right-col__content">
                                <RightSidebar/>
                            </div>
                        </aside>
                    </main>
                    <Footer />
                    {modal.open && ModalController.getModal(modal.modalName, modal.tab)}
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    const {
        user,
        loadingScreen,
        modal,
    } = state;
    return {
        user,
        loadingScreen,
        modal,
    };
}

function mapDispatchToProps(dispatch) {
    LoadingScreen.setUp(dispatch);
    Socket.setDispatch(dispatch);
    ChatSocket.setDispatch(dispatch);
    ModalController.setupDispatch(dispatch);

    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);