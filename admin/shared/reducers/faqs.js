import {
    UPDATE_FAQS_STATE,
    UPDATE_FAQ,
    DELETE_FAQ,
} from '../actions/faqsActions';


const initialState = {
    faqsList: [],
    page: 0,
    options: {},
    selectedFilter: null,
    selectedSort: null,
};

export default function faqs(state = initialState, action) {
    switch (action.type) {

        case UPDATE_FAQS_STATE: {
            for (let key in action.payload) {
                if (action.payload[key] !== null) {
                    state[key] = action.payload[key];
                }
            }
            return {...state};
        }

        case UPDATE_FAQ: {
            const {faq} = action.payload;
            state.faqsList = state.faqsList.map(faqInList=>{
                if(faqInList._id === faq._id){
                    return faq;
                } else {
                    return faqInList;
                }
            });
            return {...state};
        }

        case DELETE_FAQ: {
            const {faqID} = action.payload;
            let index = 0;
            state.faqsList.forEach((faq, i)=>{
                if(faq._id === faqID){
                    index = i;
                }
            });

            state.faqsList.splice(index, 1);
            return {...state};
        }

        default:
            return state;
    }
}