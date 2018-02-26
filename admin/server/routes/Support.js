import di   from '../di';
import Base from './Base';

const db = di.get('db');
const SupportModel = db.models.supports;
const config = di.get('config');


export default class Support extends Base {

    async countSupports(ctx) {
        const amountSupports = await SupportModel.find({}).count();

        ctx.body = {amountSupports};
    }

    async listSupports(ctx) {
        const {page, supportsSelectType} = ctx.query;
        const options = {};

        if (!page || page < 0) {
            throw new Error('Invalid page number');
        }
        if (supportsSelectType && config.adminConfig.SUPPORTS_SELECT_TYPES[supportsSelectType]) {
            options.createdAt = {$gte: config.adminConfig.SUPPORTS_SELECT_TYPES[supportsSelectType].getValue()}
        }

        const supports = await SupportModel
            .find(options)
            .sort({createdAt: -1})
            .skip((page) * config.adminConfig.SUPPORTS_PER_PAGE)
            .limit(config.adminConfig.SUPPORTS_PER_PAGE)
            .populate('user', 'userName balance email firstName lastName');

        ctx.body = {supports};
    }

    async updateSupportStatus(ctx) {
        const {supportID, status} = ctx.request.body;

        if (!config.commonConfig.SUPPORT_STATUS[status]) {
            throw new Error('Invalid status');
        }

        const support = await SupportModel.findByIdAndUpdate(
            supportID,
            {
                status,
            },
            {
                new: true,
            }
        );

        ctx.body = {supportID: support._id, status: support.status};
    }


}
