const isDev = process.env.NODE_ENV === 'development';

export default {
    USERS_PER_PAGE: 5,
    GAMES_PER_PAGE: 5,
    SUPPORTS_PER_PAGE: 5,
    FAQS_PER_PAGE: 5,
    GAMES_SELECT_TYPES:{

        "0": {
            title: 'All',
            id: '0',
            getValue: ()=>new Date(0),
        },
        "1": {
            title: 'Today',
            id: '1',
            getValue: ()=>{
                let now = new Date();
                now.setHours(0);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now;
            }
        },
        "2":{
            title: 'Day',
            id: '2',
            value: 1000*60*60*24,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24);
            }
        },
        "3": {
            title: 'Week',
            id: '3',
            value: 1000*60*60*24*7,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*7);
            }
        },
        "4":{
            title: 'Month',
            id: '3',
            value: 1000*60*60*24*30,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*30,);
            }
        },
        "5":{
            title: '3 Months',
            id: '4',
            value: 1000*60*60*24*30*3,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*30*3,);
            }
        }
    },

    USERS_SELECT_TYPES:{

        "0": {
            title: 'All',
            id: '0',
            getValue: ()=>new Date(0),
        },
        "1": {
            title: 'Today',
            id: '1',
            getValue: ()=>{
                let now = new Date();
                now.setHours(0);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now;
            }
        },
        "2":{
            title: 'Day',
            id: '2',
            value: 1000*60*60*24,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24);
            }
        },
        "3": {
            title: 'Week',
            id: '3',
            value: 1000*60*60*24*7,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*7);
            }
        },
        "4":{
            title: 'Month',
            id: '3',
            value: 1000*60*60*24*30,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*30,);
            }
        },
        "5":{
            title: '3 Months',
            id: '4',
            value: 1000*60*60*24*30*3,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*30*3,);
            }
        }
    },

    SUPPORTS_SELECT_TYPES:{

        "0": {
            title: 'All',
            id: '0',
            getValue: ()=>new Date(0),
        },
        "1": {
            title: 'Today',
            id: '1',
            getValue: ()=>{
                let now = new Date();
                now.setHours(0);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now;
            }
        },
        "2":{
            title: 'Day',
            id: '2',
            value: 1000*60*60*24,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24);
            }
        },
        "3": {
            title: 'Week',
            id: '3',
            value: 1000*60*60*24*7,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*7);
            }
        },
        "4":{
            title: 'Month',
            id: '3',
            value: 1000*60*60*24*30,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*30,);
            }
        },
        "5":{
            title: '3 Months',
            id: '4',
            value: 1000*60*60*24*30*3,
            getValue: ()=>{
                return new Date(new Date() - 1000*60*60*24*30*3,);
            }
        }
    },

    USER_BLOCK_TIME:{

        "0": {
            title: 'Day',
            id: '0',
            getValue: ()=>{
                const date = new Date();
                date.setDate(date.getDate()+1);
                return date;
            }
        },
        "1": {
            title: 'week',
            id: '1',
            getValue: ()=>{
                const date = new Date();
                date.setDate(date.getDate()+7);
                return date;
            }
        },
        "2": {
            title: 'month',
            id: '2',
            getValue: ()=>{
                const date = new Date();
                date.setDate(date.getDate()+30);
                return date;
            }
        },
        "3": {
            title: '1 minute',
            id: '3',
            getValue: ()=>{
                const date = new Date();
                date.setMinutes(date.getMinutes()+1);
                return date;
            }
        },
        "4": {
            title: '5 minute',
            id: '4',
            getValue: ()=>{
                const date = new Date();
                date.setMinutes(date.getMinutes()+5);
                return date;
            }
        },
        "5": {
            title: '10 minute',
            id: '5',
            getValue: ()=>{
                const date = new Date();
                date.setMinutes(date.getMinutes()+10);
                return date;
            }
        },
    },

}