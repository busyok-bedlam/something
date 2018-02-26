import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as supportsActions from '../actions/supportsActions';
import Support from '../components/pages/Support.jsx';

class SupportPage extends React.Component {

    render() {
        const {supports, supportsActions, params } = this.props;
        return (
            <Support
                supports={supports}
                params={params}
                supportsActions={supportsActions}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        supports: state.supports,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        supportsActions: bindActionCreators(supportsActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SupportPage);
