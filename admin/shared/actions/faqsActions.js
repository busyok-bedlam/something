import api from '../api';

export const UPDATE_FAQS_STATE = 'UPDATE_FAQS_STATE';
export const NEW_FAQ = 'NEW_FAQ';
export const UPDATE_FAQ = 'UPDATE_FAQ';
export const DELETE_FAQ = 'DELETE_FAQ';

export function load(page, options = {}) {
    return async dispatch => {
        const res = await api.faqs.faqsList({...options, page});
        if (res.faqs && res.faqs.length >= 0) {
            return dispatch({
                type: UPDATE_FAQS_STATE,
                payload: {
                    page,
                    options,
                    faqsList: res.faqs,
                },
            })
        } else {
            throw new Error('Error in loading faqs data: ' + res.toString());
        }
    }
}

export function createFaq(title, text) {
    return async dispatch => {
        const {faq} = await api.faqs.createFaq({title, text});
        return dispatch({
            type: NEW_FAQ,
            payload:{faq}
        })
    }
}

export function updateFaq(title, text, faqID) {
    return async dispatch => {
        const {faq} = await api.faqs.updateFaq({title, text, faqID});
        return dispatch({
            type: UPDATE_FAQ,
            payload:{faq}
        })
    }
}

export function deleteFaq(faqID) {
    return async dispatch => {
        await api.faqs.deleteFaq({faqID});
        return dispatch({
            type: DELETE_FAQ,
            payload:{faqID}
        })
    }
}




