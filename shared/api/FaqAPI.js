import Base from './BaseAPI';

export default class FaqAPI extends Base {

    getFaqs() {
        return this.apiClient.get('faqs');
    }
}

