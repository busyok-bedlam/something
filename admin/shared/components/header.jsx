import React from 'react';
import AppBar from 'material-ui/AppBar';
import {browserHistory} from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import api from "../api";
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';


export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: '',
            messageModal: '',
            openModal: false,
        };
    }

    async componentWillMount() {
        try {
            const res = await api.admin.info();
            if (res.dataUser) {
                this.props.adminActions.successLoginUser(res.dataUser);
                if (location.pathname === '/') {
                    browserHistory.push('/users');
                }
            } else {
                browserHistory.push('/');
            }
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
            browserHistory.push('/');
        }
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.user.isAuth) {
            browserHistory.push('/');
        }
    }


    handleRequestClose = () => {
        this.setState({
            openModal: false,
        });
    };


    render = () => {

        if (this.props.user.isAuth) {
            const {drawerActions} = this.props;

            return <div>
                <AppBar
                    iconElementLeft={
                        <IconButton onClick={drawerActions.open}>
                            <NavigationMenu />
                        </IconButton>
                    }
                    title="Panos247 admin"
                    children={[<ToastContainer/>,]}/>

                <Snackbar
                    open={this.state.openModal}
                    message={this.state.messageModal}
                    action="Close"
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                    onActionTouchTap={this.handleRequestClose}
                />
            </div>

        } else {
            return null;
        }
    }
}


