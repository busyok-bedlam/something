import services from '../services';

export default function (actionPath, args) {
    const action = new services[actionPath[0]][actionPath[1]]();
    return action.exec(args);
}