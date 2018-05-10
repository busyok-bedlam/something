import Coinpayments from 'coinpayments';
import di from '../../di';
const db = di.get('db');
const RatesModel = db.models.rates;
const isDev = process.env.NODE_ENV === 'development';

const client = new Coinpayments({
    key:"066adc90201803cdd8d5091f85ba7d5a26cb5072be74a43756f5374439967f3b",
    secret: "D3BE18eD3EBdeA06e64d309ECE73fEe11597A15bea45aa56403aeb9d159E8f42",
});

export default class CoinpaymentsClass {
    async createPayment(amount, orderID) {
        this.amount = amount;
        this.orderID = orderID;
        const {
            txn_id,
            status_url,
        } = await this.__createPayment();
        return {paymentID: txn_id, url: status_url};
    }

    __createPayment(){
        return new Promise((resolve, reject)=>{
            client.createTransaction(
                {
                    'currency1' : 'USD',
                    'currency2' : 'BTC',
                    'amount' : this.amount,
                },
                function(error,result){
                if(error){
                    console.error(error);
                    reject(error);
                } else {
                    resolve(result)
                }
            });
        });
    }

    async handleReturn(body, method){
        const {
            ipn_version,
            ipn_id,
            ipn_mode,
            merchant,
            ipn_type,
            txn_id,
            status,
            status_text,
            currency1,
            currency2,
            amount1,
            amount2,
            fee,
            buyer_name,
            received_amount,
            received_confirms,
        } = body;

        return {
            paymentID: txn_id,
        }
    }

    async handleCancel(body, method){
        const {
            ipn_version,
            ipn_id,
            ipn_mode,
            merchant,
            ipn_type,
            txn_id,
            status,
            status_text,
            currency1,
            currency2,
            amount1,
            amount2,
            fee,
            buyer_name,
            received_amount,
            received_confirms,
        } = body;

        return {
            paymentID: txn_id,
        }
    }

    async handlePayout(amountToPayout, payoutData){
        const usd = await RatesModel.findOne({type: 'USD'});
        const {id, amount, status} = await this.__payout(amountToPayout, payoutData, usd.value);
        if(status === 0 || status ===1){
            return {payoutID: id};
        } else {
            throw new Error('Error in creating coinpayments payout. Status: '+status);
        }
    }


    __payout(amount, payoutData, rateBTC){
        return new Promise((resolve, reject)=>{
            console.log('usd: '+amount);
            console.log('btc: '+(Math.floor(((amount*rateBTC)*100000000))/100000000));
            client.createWithdrawal(
                {
                    'currency' : 'BTC',
                    'amount' : (Math.floor((amount*rateBTC)*100000000)/100000000),
                    'address': payoutData
                },function(error,result){
                if(error){
                    console.error(error);
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    }
}

async function updateRates(){
    try {
        console.log('Rate updates');
        const {
            USD
        } = await __getRates();
        let usd = await RatesModel.findOneAndUpdate({type: 'USD', value: USD.rate_btc});
        console.log('USD>BTC: '+USD.rate_btc);
        if(!usd){
            usd = new RatesModel({type: 'USD', value: USD.rate_btc});
            await usd.save();
        }
    } catch (error){
        console.error('Error updating rates');
        console.error(error);
    }
}

function __getRates() {
    return new Promise((resolve, reject)=>{
        client.rates(function(error,result){
            if(error){
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
if(!isDev){
    updateRates();
    setInterval(updateRates, 1000*60*60*2);
}