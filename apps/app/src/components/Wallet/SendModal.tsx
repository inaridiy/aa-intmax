import React, { useState } from "react";
import { useNetwork } from "../../states/hooks";
import { Modal } from "../Layout/Modal";

export const SendModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const chain = useNetwork();

  return (
    <Modal {...{ isOpen, onClose }}>
      <h2 className="text-2xl font-bold">Send</h2>

      <div className="form-control ">
        <label className="label">To</label>
        <input className="input input-bordered" />
      </div>
      <div className="form-control ">
        <label className="label">Asset</label>
        <input
          readOnly
          className="input input-bordered"
          value={chain.mock ? "ETH" : chain.nativeCurrency.symbol}
        />
      </div>
      <div className="form-control ">
        <label className="label">Value</label>
        <input className="input input-bordered" />
      </div>
      <button className="btn mt-4 w-full">Send</button>
    </Modal>
  );
};
