import React from 'react';
import ModalContaroller from '../../lib/ModalController';
import DepositModal from './DepositModal.jsx';
import SkinsModal from './SkinsModal.jsx';
import AccountModal from './AccountModal.jsx';
import SupportModal from './SupportModal.jsx';
import ProvablyFairModal from './ProvablyFairModal.jsx';
import LoginModal from './LoginModal.jsx';
import TermsOfUsageModal from './TermsOfUsageModal.jsx';

ModalContaroller.setupModal('AccountModal', <AccountModal/>);
ModalContaroller.setupModal('DepositModal', <DepositModal/>);
ModalContaroller.setupModal('LoginModal', <LoginModal/>);
ModalContaroller.setupModal('SupportModal', <SupportModal/>);
ModalContaroller.setupModal('SkinsModal', <SkinsModal/>);
ModalContaroller.setupModal('TermsOfUsageModal', <TermsOfUsageModal/>);
ModalContaroller.setupModal('ProvablyFairModal', <ProvablyFairModal/>);