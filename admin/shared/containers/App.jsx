import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header.jsx';
import DrawerMenu from '../components/common/DrawerMenu.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import '../assets/styles/style.css';

class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <DrawerMenu/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
}

export default connect()(App);