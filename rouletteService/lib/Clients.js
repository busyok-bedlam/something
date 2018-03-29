export default class Clients {

    static allClients = {};
    static clients = {};
    static authClients = {};

    static addAuthClient(id, data) {
        Clients.allClients[id] = data;
        Clients.authClients[id] = data;
    }

    static addClient(id, data) {
        Clients.allClients[id] = data;
        Clients.clients[id] = data;
    }

    static removeClient(id) {
        Clients.allClients[id] && delete Clients.allClients[id];
        Clients.clients[id] && delete Clients.clients[id];
        Clients.authClients[id] && delete Clients.authClients[id];
    }

    static isAuthClient(id) {
        return Clients.authClients[id];
    }

    static isClient(id) {
        return Clients.clients[id];
    }

    static actionAllClients(cb) {
        for (let i in Clients.allClients) {
            cb(i, Clients.allClients[i]);
        }
    }

    static actionClients(cb) {
        for (let i in Clients.clients) {
            cb(i, Clients.clients[i]);
        }
    }

    static actionAuthClients(cb) {
        for (let i in Clients.authClients) {
            cb(i, Clients.authClients[i]);
        }
    }

    static getClient(id) {
        if (Clients.authClients[id]) {
            return Clients.authClients[id];
        } else if (Clients.clients[id]) {
            return Clients.clients[id];
        } else {
            return null;
        }
    }
}