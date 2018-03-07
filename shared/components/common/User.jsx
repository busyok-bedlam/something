import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class User extends Component {
    static propTypes = {
        isAdmin: PropTypes.bool,
        isModerator: PropTypes.bool,
        level: PropTypes.number,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    };

    render() {
        let {level, isAdmin, isModerator, name, image} = this.props;
        let colorLevel, classNameUser = '';
        if (isAdmin) classNameUser = "user__admin";
        if (isModerator) classNameUser = "user__moderator";
        if (!isAdmin && !isModerator) {
            switch (true) {
                case (level < 49):
                    colorLevel = "user__level";
                    break;
                case (level < 59):
                    colorLevel = "user__level user__level-1 icon-fire";
                    break;
                case (level < 69):
                    colorLevel = "user__level user__level-2 icon-fire";
                    break;
                case (level < 79):
                    colorLevel = "user__level user__level-3 icon-fire";
                    break;
                case (level < 99):
                    colorLevel = "user__level user__level-4 icon-fire";
                    break;
                default:
                    colorLevel = "user__level user__level-5 icon-fire";
                    break;
            }
        }

        return (
            <span className={'user ' + classNameUser}>
                <span className="avatar" style={{backgroundImage: `url("${image}")`}}/>
                {level && <span className={colorLevel}>{level}</span>}
                <span className="name">
                    {isAdmin && <span>[ADMIN] </span>}
                    {isModerator && <span>[MODERATOR] </span>}
                    {name}:
                </span>
            </span>
        );
    }
}
