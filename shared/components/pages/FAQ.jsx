import React, {Component} from "react";
import FAQItem from './FAQItem.jsx';
import api from '../../api';

export default class FAQ extends Component {
    state = {
        faqs: [
            {
                title: "Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt ",
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n' +
                '\n' +
                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
            },
            {
                title: "Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt ",
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n' +
                '\n' +
                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
            }
        ],
    };

    async componentWillMount() {
        // try{
        //     const {faqs} = await api.faq.getFaqs();
        //     this.setState({faqs});
        // } catch (error){
        //     console.error(error);
        //     alert(error.message || error.toString());
        // }
    }

    __renderFaqs() {
        const list = [];
        const {faqs} = this.state;
        faqs.forEach((faq, i) => {
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

