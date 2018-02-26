import React from 'react';

export default class ModalController{
    static setupDispatch (dispatch) {
        ModalController.__dispatch = dispatch;
    }
    static __dispatch = null;
    static modalComponents = {};

    static setupModal(name='default', modalComponent = null){
        ModalController.modalComponents[name] = modalComponent;
    }

    static getModal(name='default'){
        return ModalController.modalComponents[name];
    }

    static openModal(name = 'default', tab = '', data = {}){
        if(!ModalController.__dispatch){
            console.error('Dispatch is not initialize');
        } else {
            ModalController.__dispatch({type: 'OPEN_MODAL', payload:{name, tab, data}})
        }
    }

    static closeModal(){
        if(!ModalController.__dispatch){
            console.error('Dispatch is not initialize');
        } else {
            ModalController.__dispatch({type: 'CLOSE_MODAL'})
        }
    }
}