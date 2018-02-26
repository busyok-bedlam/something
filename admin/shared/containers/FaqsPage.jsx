import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as faqsActions from '../actions/faqsActions';
import Faqs from '../components/pages/Faqs.jsx';

class FaqsPage extends React.Component {

    render() {
        const {
            faqs,
            params,
            faqsActions,
        } = this.props;

        return (
            <Faqs
                faqs={faqs}
                params={params}
                faqsActions={faqsActions}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        faqs: state.faqs,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        faqsActions: bindActionCreators(faqsActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FaqsPage);
