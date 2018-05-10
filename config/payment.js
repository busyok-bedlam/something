const isDev = process.env.NODE_ENV === 'development';
export default
{
    "paypal": {
        "mode": "sandbox",
        "client_id": "AaDQR5ydEpdvfo7aDDAzq-N6yWUujZajHj1DyX5Qz8ebHSUY8O1J5zuyP9OPfQauxxJE_If0RiJTM_ts",
        "client_secret": "EEt6AdEydjikjQ-k9XZ3KT8BgqGb6WhyUcwmSIfwrP1UdB_VcjMQ4zgyslkxE2XMlRR0uzPeqz5tf_6L"
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

