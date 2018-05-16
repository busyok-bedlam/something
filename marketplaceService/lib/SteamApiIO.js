import request from 'request';

const config = {
  appID: 730,
};

export default class SteamApiIO {
  //TODO make key is settable value
  static _apiKey = '684e5b56805590f0e8f927038e194afd';

  static _request(url = '') {
    if (!SteamApiIO._apiKey) {
      throw new Error('No API key. Use method "setKey" before!');
    }

    return new Promise((resolve, reject) => {
      request(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (error, response, body) => {
          if (error) {
            return reject(error);
          }
          return resolve(JSON.parse(body));
        });
    });
  }

  static setKey(key = null) {
    SteamApiIO._apiKey = key;
  }

  static async getUserInventory(userID, appID = config.appID) {
    return await SteamApiIO._request(`https://api.steamapi.io/user/inventory/${userID}/${appID}/2?key=${SteamApiIO._apiKey}`)
  }

  static async getItemsPrices(appID = config.appID) {
    return await SteamApiIO._request(`https://api.steamapi.io/market/prices/${appID}?key=${SteamApiIO._apiKey}`)
  }

  static async getItemsData (appID = config.appID) {
    return await SteamApiIO._request(`https://api.steamapi.io/market/items/${appID}?key=${SteamApiIO._apiKey}`)
  }

  static async getPricedItems() {
    const itemsData = await SteamApiIO.getItemsData();
    const itemsPrices = await SteamApiIO.getItemsPrices();
    for (let assetID in itemsData) {
      itemsData[assetID].price = parseFloat(itemsPrices[itemsData[assetID].market_hash_name]) || 0;
    }
    return itemsData;
  }
}

async function test() {
  try {
    SteamApiIO.setKey('bf16328ce7546c966772e8544f77da89');
    // const userInventory = await SteamApiIO.getUserInventory('76561198358440418');
    // const prices = await SteamApiIO.getItemsPrices();
    // const items = await SteamApiIO.getItemsData();
    // const pricedItems = await SteamApiIO.getPricedItems();
  } catch (error) {
    console.error(error);
  }
}