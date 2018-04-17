import React, {Component} from "react";
import PropTypes from 'prop-types';
import NavLink from './NavLink.jsx';
import AuthHeader from './Header/AuthHeader.jsx';
import NotAuthHeader from './Header/NotAuthHeader.jsx';
import ModalController from '../../lib/ModalController';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Header extends Component {
    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
        displayName: PropTypes.string,
        avatar: PropTypes.string,
        balance: PropTypes.number,
        cbHandleLogout: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.totalInc = {
            roulette: undefined,
        };

        this.total = {
            roulette: 0,
        };

        this.state = {
            totalToShow: {

                roulette: 0,


            },
            auth: false,
            time: '',
            selectedOption: 'eng',
            menuOpen: false
        }
    }

    // state = {
    //     auth: false,
    //     time: '',
    //     selectedOption: 'eng',
    //     menuOpen: false
    // };



    handleOpenMenu = () => {
      this.setState({
          menuOpen: !this.state.menuOpen
      })
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption: selectedOption.value});
    };

    checkTime = (i) => (i < 10) ? "0" + i : i;
    startTime = () => {
        let today = new Date();
        this.setState({
            time: today.getHours() + ":" + this.checkTime(today.getMinutes()) + ":" + this.checkTime(today.getSeconds())
        });
        setTimeout(this.startTime, 1000);
    };

    componentWillUpdate(nextProps, nextState) {
        // Hide topnav when router was changed
        if(this.props.location.pathname != nextProps.location.pathname) {
            nextState.menuOpen = false;
        }
    }

    componentDidMount() {
        this.startTime();
    }

    totalUpdater(time, i) {
        let total = this.total[i];
        let totalToShow = this.state.totalToShow[i];

        if (totalToShow + 1 < total) {

            totalToShow += 1;
            this.state.totalToShow[i] = totalToShow;
            this.setState(this.state);

            this.totalInc[i] = setTimeout(this.totalUpdater.bind(this, time, i), time);
        } else if (totalToShow + 1 == total) {
            this.state.totalToShow[i] = totalToShow + 1;
            this.setState(this.state);
        }
    }

    componentDidUpdate() {

        let totals = {
            roulette: this.props.totalRoulette,
        };
        for (let i in totals) {
            let total = totals[i];

            if (total != 0 && total > this.total[i]) {

                let bet = total - this.total[i];
                let inc = Math.floor(bet > 1000 ? bet * 0.02 : bet * 0.2);

                this.total[i] = total;
                this.state.totalToShow[i] = this.total[i] - inc;

                this.setState(this.state);

                if (this.totalInc[i]) {
                    clearTimeout(this.totalInc[i]);
                }

                this.totalUpdater(Math.floor(800 / inc), i);

            } else if (total == 0 && this.total[i] != 0) {
                this.total[i] = 0;
                if (this.totalInc[i]) {
                    clearTimeout(this.totalInc[i]);
                }
                this.state.totalToShow[i] = 0;
                this.setState(this.state);
            }
        }
    }

    render() {
        const {
            isAuth,
            displayName,
            avatar,
            balance,
            cbHandleLogout,
        } = this.props;
        const {selectedOption, time, menuOpen} = this.state;

        return (
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="header__top-left">
                            <span>{time}</span>
                            <Select
                                name="form-field-name"
                                value={selectedOption}
                                onChange={this.handleChange}
                                searchable={false}
                                clearable={false}
                                className='select'
                                optionClassName='select__options'
                                options={[
                                    {value: 'eng', label: <div className='select__option'><img src='./static/images/united-kingdom.svg' />ENG</div>},
                                    {value: 'tur', label: <div className='select__option'><img src='./static/images/turkey.svg' />TUR</div>},
                                ]}
                            />
                        </div>
                        {
                            (isAuth) ?
                                <AuthHeader
                                    cbHandleLogout={cbHandleLogout}
                                    displayName={displayName}
                                    avatar={avatar}
                                    balance={balance}
                                /> :
                                <NotAuthHeader/>
                        }
                    </div>
                </div>
                <div  className={(menuOpen) ? "header__bottom" :"header__bottom header__bottom-hide" }>
                    <div className="container">
                        <div className={(menuOpen) ? "hamburger-box mobile-show active" : "hamburger-box mobile-show"} onClick={this.handleOpenMenu.bind(this)}>
                            <button>
                                <i className="hamburger" />
                            </button>
                        </div>
                        <nav className="header__bottom-left">
                            <div className='logo'>
                                <img className='logoSVG' src="static/images/logo.png" alt='Blaze'/>
                            </div>
                            <NavLink to='/' onlyActiveOnIndex className='button-game'>
                                Roulette
                                <div className="link-chip">{this.state.totalToShow['roulette']}</div>
                            </NavLink>
                            <NavLink to='/crash' className='button-game'>
                                Crash
                                <div className="link-chip">7532</div>
                            </NavLink>
                        </nav>
                        <nav className="header__bottom-right">
                            <NavLink to='/shop' className='header__bottom-right-link'>Shop</NavLink>
                            <NavLink to='/top-players' className='header__bottom-right-link'>Top players</NavLink>
                            <NavLink to='/faq' className='header__bottom-right-link'>FAQ</NavLink>
                            <NavLink to='/support' className='header__bottom-right-link'>Support</NavLink>
                            <NavLink to='/privacy-policy' className='header__bottom-right-link'>Privacy policy</NavLink>
                            <button
                                onClick={() => ModalController.openModal('DepositModal')}
                                className="button mobile-show">Deposit</button>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
