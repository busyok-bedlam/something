import Base from './BaseAPI';

export default class UserAPI extends Base {
    faqsList(data) {
        return this.apiClient.get('faqs/list', data);
    }

    createFaq(data) {
        return this.apiClient.post('faqs/create', data);
    }

    updateFaq(data) {
        return this.apiClient.post('faqs/update', data);
    }

    deleteFaq(data) {
        return this.apiClient.post('faqs/delete', data);
    }
}

