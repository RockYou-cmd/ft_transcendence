import { ReactNode, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, closeModal, children}: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div id="tester" className="omarakoudad fixed z-1 overflow-y-auto flex items-center justify-center">
            <div className="fixed bg-gray-500 opcaity-75"></div>
            <div className="bg-white p-6 rounded-lg w-[500px]">
                <div className="text-righ">
                    <button onClick={closeModal} className="text-red-500">Close</button>
                </div>
                <div className="text-black">{children}</div>
            </div>
        </div> 
    );
};

export default Modal;