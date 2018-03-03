import React from 'react';
import ModalContaroller from '../../lib/ModalController';
import DepositModal from './DepositModal.jsx';
import ProvablyFairModal from './ProvablyFairModal.jsx';
import LoginModal from './LoginModal.jsx';
import TermsOfServiceModal from './TermsOfServiceModal.jsx';

ModalContaroller.setupModal('DepositModal', <DepositModal/>);
ModalContaroller.setupModal('LoginModal', <LoginModal/>);
ModalContaroller.setupModal('TermsOfServiceModal', <TermsOfServiceModal/>);
ModalContaroller.setupModal('ProvablyFairModal', <ProvablyFairModal/>);