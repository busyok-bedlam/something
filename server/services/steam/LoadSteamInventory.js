import SteamAPI from '../../lib/SteamAPI';

export default class LoadSteamInventory {
    async exec({userID}){
        const items = await SteamAPI.loadUserInventory(userID);
        return {items};
    }
}