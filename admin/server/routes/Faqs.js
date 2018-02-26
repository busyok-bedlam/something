import di   from '../di';
import Base from './Base';

const db = di.get('db');
const FaqsModel = db.models.faqs;
const config = di.get('config');


export default class Faqs extends Base {

    async listFaqs(ctx) {
        const {page} = ctx.query;
        const options = {};

        if (!page || page < 0) {
            throw new Error('Invalid page number');
        }
        // if (gamesSelectType && config.adminConfig.GAMES_SELECT_TYPES[gamesSelectType]) {
        //     options.createdAt = {$gte: config.adminConfig.GAMES_SELECT_TYPES[gamesSelectType].getValue()}
        // }

        const faqs = await FaqsModel
            .find(options)
            .sort({createdAt: -1})
            .skip((page) * config.adminConfig.FAQS_PER_PAGE)
            .limit(config.adminConfig.FAQS_PER_PAGE);

        ctx.body = {faqs};
    }

    async createFaq(ctx){
        const {title, text} = ctx.request.body;
        if(!title || !text){
            throw new Error('Invalid input data');
        }
        const faq = await new FaqsModel({title, text}).save();
        return ctx.body = {faq};
    }

    async updateFaq(ctx){
        const {title, text, faqID} = ctx.request.body;
        if(!title || !text){
            throw new Error('Invalid input data');
        }
        const faq = await FaqsModel.findByIdAndUpdate(faqID, {title, text}, {new: true});
        return ctx.body = {faq};
    }

    async deleteFaq(ctx){
        const {faqID} = ctx.request.body;
        if(!faqID){
            throw new Error('Invalid id');
        }
        await FaqsModel.findByIdAndRemove(faqID);
        return ctx.body = {status: true};
    }
}
