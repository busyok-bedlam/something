import React, {Component} from "react";
import Sidebar from './../components/common/Sidebar.jsx';
import {connect}            from "react-redux";
import {bindActionCreators} from "redux";

class ContainerPage extends Component {

    static mapStateToProps(state) {
        const {
            user,
        } = state;
        return {
            user,
        };
    }

    render() {
        const {user} = this.props;
        return (
            <section className="container container-page">
                <div className="row">
                    <div className="col-lg-9">
                        {this.props.children}
                    </div>
                    <Sidebar user={user} />
                </div>
            </section>
        );
    }
}

export default connect(ContainerPage.mapStateToProps)(ContainerPage);
