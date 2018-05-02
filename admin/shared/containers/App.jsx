import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header.jsx';
import DrawerMenu from '../components/common/DrawerMenu.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

injectTapEventPlugin();
import '../assets/styles/style.css';

class App extends Component {
    componentDidMount() {
        document.getElementById('mainLoader').style.display = 'none';
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <DrawerMenu/>
                    {this.props.children}
                    <ToastContainer />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default connect()(App);