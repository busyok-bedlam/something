import React, {Component} from "react";

export default class SupportTab extends Component {
    render() {
        return (
            <div className='support'>
                <form action="" className="support__form">
                    <div className="input-hover">
                        <input type="text" id='name' required />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-hover">
                        <input type="email" id='email' required/>
                        <label htmlFor="email">E-mail</label>
                    </div>
                    <div className="input-hover">
                        <textarea id='message' required/>
                        <label htmlFor="message">Message</label>
                    </div>
                    <button className="button button-green">Send message</button>
                </form>
                <div className="support__text">
                    Our support team normally responds in 24-48 hour time period.<br />
                    Any abuse of our system can result in your account being closed.
                </div>
            </div>
        )
    }
}