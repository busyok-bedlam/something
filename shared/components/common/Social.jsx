import React, {Component} from "react";

export default class Social extends Component {
    render() {
        return (
            <div className="footer__social">
                <a href="" target='_blank' className='facebook'><i className='icon-facebook'/></a>
                <a href="" target='_blank' className='twitter'><i className='icon-twitter'/></a>
                <a href="" target='_blank' className='steam'><i className='icon-steam'/></a>
            </div>
        );
    }
}
