import { createContext } from 'react';

const ModalContext = createContext({
    isModalVisible: false,
    showModal: () => {},
    hideModal: () => {},
    content: null,
    setContent: (content: any) => {},
});

export default ModalContext;
