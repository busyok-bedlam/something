import React, {Component} from "react";
import FAQItem from './FAQItem.jsx';
import api from '../../api';

export default class FAQ extends Component {
    state={
        faqs: [],
    }

    async componentWillMount(){
        try{
            const {faqs} = await api.faq.getFaqs();
            this.setState({faqs});
        } catch (error){
            console.error(error);
            alert(error.message || error.toString());
        }
    }

    __renderFaqs(){
        const list = [];
        const {faqs} = this.state;
        faqs.forEach((faq, i)=>{
            list.push(
                <FAQItem
                    title={faq.title}
                    text={faq.text}
                    key={i}/>
            );
        });
        return list;
    }

    render() {
        return (
            <div className="faq container">
                <h2 className="main-header">FAQ</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicingelit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim
                </div>
                <div className="faq__wrapper">
                    {this.__renderFaqs()}
                </div>
            </div>
        );
    }
}

