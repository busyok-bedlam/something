import React, {Component} from "react";
import PropTypes from 'prop-types';
import NavLink from './NavLink.jsx';
import AuthHeader from './Header/AuthHeader.jsx';
import NotAuthHeader from './Header/NotAuthHeader.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Header extends Component {
    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
        displayName: PropTypes.string,
        avatar: PropTypes.string,
        cbHandleLogout: PropTypes.func.isRequired,
    };

    state = {
        auth: false,
        time: '',
        selectedOption: 'eng'
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

    componentDidMount() {
        this.startTime();
    }

    render() {
        const {
            isAuth,
            displayName,
            avatar,
            cbHandleLogout,
        } = this.props;
        const {selectedOption, time} = this.state;

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
                                openOnFocus={true}
                                options={[
                                    {value: 'eng', label: 'ENG'},
                                    {value: 'tur', label: 'TUR'},
                                ]}
                            />
                        </div>
                        {/*{
                            (isAuth) ?
                                <AuthHeader
                                    cbHandleLogout={cbHandleLogout}
                                    displayName={displayName}
                                    avatar={avatar}
                                /> :
                                <NotAuthHeader/>
                        }*/}
                        <AuthHeader
                            cbHandleLogout={cbHandleLogout}
                            displayName={displayName}
                            avatar={avatar}
                        />
                    </div>
                </div>
                <div className="header__bottom">
                    <div className="container">
                        <nav className="header__bottom-left">
                            <div className='logo'>
                                <img src="static/images/logo.png" alt=""/>
                            </div>
                            <NavLink to='/' onlyActiveOnIndex className='button-game'>
                                Roulette
                                <div className="link-chip">7532</div>
                            </NavLink>
                            <NavLink to='/crash' className='button-game'>
                                Crash
                                <div className="link-chip">7532</div>
                            </NavLink>
                        </nav>
                        <nav className="header__bottom-right">
                            <NavLink to='/shop'>Shop</NavLink>
                            <NavLink to='/top-players'>Top players</NavLink>
                            <NavLink to='/faq'>FAQ</NavLink>
                            <NavLink to='/support'>Support</NavLink>
                            <NavLink to='/privacy-policy'>Privacy policy</NavLink>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
