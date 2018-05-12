const isDev = process.env.NODE_ENV === 'development';
export default
{
    "paypal": {
        "mode": "sandbox",
        "client_id": "ASdGYyPBYQqFim99Bcraws4L8qJaODxpo9iyGkKMh9_RfdXpUjb9jym4PL8_K-12HCGYKRjHGx1uCqAR",
        "client_secret": "EDiSVto9-8mH2ANYRUzL0qhVGajRQxyOb0A57yWsfzPaSUjLnc07b7n20r0d2VAiHUaOwHg8iMqHLLry"
    },
    "PAYMENT_TYPE": {
        "BUYING": "BUYING",
        "PAYOUT": "PAYOUT"
    },
    "PAYMENT_STATUS": {
        "FREE": "FREE",
        "CREATED": "CREATED",
        "IN_PROCESS": "IN_PROCESS",
        "CANCELED": "CANCELED",
        "COMPLETED": "COMPLETED",
        "ERROR": "ERROR"
    },
    "PAYMENT_METHOD": {
        "COINPAYMENTS": {
            "id": "coinpayments"
        }
    },
    "PAYOUT_METHOD": {
        "PAYPAL": {
            title: 'PayPal',
            "id": "PAYPAL",
        },
        COINPAYMENTS: {
            title: 'CoinPayments',
            id: 'COINPAYMENTS',
        }
    },

}

