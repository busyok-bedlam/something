import React, {Component} from "react";
import FAQItem from './FAQItem.jsx';
import api from '../../api';

export default class FAQ extends Component {
    state={
        faqs: [
            {
                title: "gfljgvlkj",
                text: 'vriojroivei'
            }
        ],
    };

    async componentWillMount(){
        // try{
        //     const {faqs} = await api.faq.getFaqs();
        //     this.setState({faqs});
        // } catch (error){
        //     console.error(error);
        //     alert(error.message || error.toString());
        // }
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
            <div className="faq">
                <h2 className="page-header">FAQ</h2>
                <div className="faq__wrapper page-container">
                    {this.__renderFaqs()}
                </div>
            </div>
        );
    }
}

