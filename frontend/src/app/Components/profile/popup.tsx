import { ReactNode, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, closeModal, children}: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div id="tester" className=" absolute m-64 z-10 overflow-y-auto ">
            <div className="fixed bg-gray-500 "></div>
            <div className="bg-white p-6 rounded-lg w-[500px]">
                <div className="text-black">{children}</div>
                <div className="items-center">
                    <button onClick={closeModal} className="text-white rounded  bg-red-500 w-[64px]">Close</button>
                </div>
            </div>
        </div> 
    );
};

export default Modal;