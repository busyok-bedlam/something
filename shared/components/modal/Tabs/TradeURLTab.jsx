import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {toast} from 'react-toastify';
import {bindActionCreators} from 'redux';
import * as userActions     from '../../../actions/userActions';


class TradeURLTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
        };
    }

    static propTypes = {
        user: PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            link: nextProps.user.tradeURL,
        });
    };

    handleChangeLink = (e) => {
        e.preventDefault();

        this.props.user.tradeURL = e.target.value.trim();

        this.setState({
            link: e.target.value.trim()
        });
    };

    setTradeLink =  async () => {
        try {
            await this.props.userActions.setupTradeURL(this.state.link);
            // toast('Updated');
        } catch (error){
            toast(error.message || 'Error happened');
        }

    };

    openProfileWindow = () => {
        window.open(`https://steamcommunity.com/profiles/${this.props.user.id}/tradeoffers/privacy#trade_offer_access_url`);
    };

    render() {
        return (
            <div className='tab__trade'>
                <div>You can find your current Steam trade offer url
                    <span className='link' onTouchTap={this.openProfileWindow}> here</span>
                </div>
                <input
                    onChange={this.handleChangeLink}
                    type="text"
                    className='input'
                    value={this.state.link}
                    placeholder='Insert your link...'/>
                <button className="button button-green" onTouchTap={this.setTradeLink}>Save</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state;
    return {user};
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeURLTab);