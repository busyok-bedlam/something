import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import {connect} from "react-redux";

export class LoadingScreen {
    static __dispatch = null;

    static setUp(dispatch) {
        LoadingScreen.__dispatch = dispatch;
    }

    static open() {
        LoadingScreen.__dispatch({type: 'loading_open'})
    }

    static close() {
        LoadingScreen.__dispatch({type: 'loading_close'})
    }
}

class LoadingScreenComponent extends Component {

    static mapStateToProps(state) {
        const {
            loadingScreen,
        } = state;
        return {
            loadingScreen,
        };
    }

    render() {
        const {loadingScreen} = this.props;
        if (loadingScreen.open) {
            return (
                <ReactLoading
                    type="bubbles"
                    className={this.props.className}
                />
            );
        } else {
            return null;
        }
    }
}

export default  connect(LoadingScreenComponent.mapStateToProps, null)(LoadingScreenComponent);