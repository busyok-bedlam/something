const isDev = process.env.NODE_ENV === 'development';

export default {
    BROADCAST_PERIOD: 1000,
    CHAT_LENGTH: isDev? 10: 50,
}


