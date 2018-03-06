import React from 'react';
import ModalController from '../../lib/ModalController';
import DepositModal from './DepositModal.jsx';
import ProvablyFairModal from './ProvablyFairModal.jsx';
import LoginModal from './LoginModal.jsx';
import TermsOfServiceModal from './TermsOfServiceModal.jsx';

ModalController.setupModal('DepositModal', <DepositModal/>);
ModalController.setupModal('LoginModal', <LoginModal/>);
ModalController.setupModal('TermsOfServiceModal', <TermsOfServiceModal/>);
ModalController.setupModal('ProvablyFairModal', <ProvablyFairModal/>);