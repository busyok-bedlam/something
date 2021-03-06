import React, {Component} from "react";

export default class FAQItem extends Component {
    state = {
        itemOpen: false
    };

    toggleItem() {
        this.setState({
            itemOpen: !this.state.itemOpen
        })
    }

    render() {
        const {title, text} = this.props;
        return (
            <div
                className={(this.state.itemOpen) ? "faq__item faq__item-active" : "faq__item"}>
                <div className="faq__header"
                     onClick={this.toggleItem.bind(this)}>
                    {title}
                </div>
                <div className="faq__content">
                    <p>
                        {text}
                    </p>
                </div>
            </div>
        );
    }
}

