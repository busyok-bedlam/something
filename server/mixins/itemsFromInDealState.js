import di from '../di';
const db = di.get('db');
const ItemsModel = db.models['items'];
const {ITEM_STATUS} = di.get('config');

export default async function (items) {
    return await ItemsModel.update(
        {_id: {$in: items}},
        {$set: {enabled: true, status: ITEM_STATUS.NEW}},
        {"multi": true}
    );
}