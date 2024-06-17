import "./Paymentpage.css";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export function Paymentpage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState(10000);
    const [cardType, setCardType] = useState("Credit Card");
    const [cardNetwork, setCardNetwork] = useState("Visa");
    const [renderRates, setRenderRates] = useState([]);

    const handleOpenModal = () => { setIsModalOpen(true); amountFinder(); };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAmount = (event) => { setAmount(event.target.value); amountFinder() }
    const handleCardType = (event) => { setCardType(event.target.value); amountFinder() }
    const handleCardNetwork = (event) => { setCardNetwork(event.target.value); amountFinder() }

    let currentRates = 0;
    let saveRates = [];
    const saveContent = {
        "network": "",
        "type": "",
        "discount": ""
    }

    const amountFinder = () => {
        const defCardType = ((cardType).toLocaleLowerCase()).includes("credit") ? "credit" : "debit";
        const defCardNetwork = cardNetwork;
        const interChangeFee = ((Number(amount) * ((Number((bandDisDetails[defCardNetwork])[defCardType].percent)) / 100)) + Number((bandDisDetails[defCardNetwork])[defCardType].fixed));
        currentRates = parseInt(interChangeFee);
        otherRatesFind();
    }

    const otherRatesFind = () => {
        const amountHandle = Number(amount);
        const networkHandle = Object.keys(bandDisDetails);
        let interFeeHandle = 0;
        networkHandle.forEach((item) => {
            (Object.keys(bandDisDetails[item])).forEach((bot) => {
                let bodySend = { ...saveContent };
                bodySend.network = item;
                bodySend.type = (bot === "credit") ? "Credit Card" : "Debit Card";
                interFeeHandle = parseInt((Number(amountHandle) * (Number((bandDisDetails[item])[bot].percent) / 100)) + Number((bandDisDetails[item])[bot].fixed))
                bodySend.discount = (currentRates - interFeeHandle);
                if (Number(bodySend.discount) > 0) {
                    saveRates.push(bodySend);
                }
            });
        });
        console.log(saveRates);
        setRenderRates(saveRates); // Update the state with the calculated rates
    }

    let bandDisDetails = {
        "Visa": {
            "credit": { "percent": "1.75", "fixed": "4.00" },
            "debit": { "percent": "0.75", "fixed": "2.50" }
        },
        "Mastercard": {
            "credit": { "percent": "1.80", "fixed": "22.50" },
            "debit": { "percent": "0.80", "fixed": "11.00" }
        },
        "RuPay": {
            "credit": { "percent": "1.60", "fixed": "19.00" },
            "debit": { "percent": "0.65", "fixed": "8.50" }
        },
        "Discover": {
            "credit": { "percent": "1.85", "fixed": "22.50" },
            "debit": { "percent": "0.70", "fixed": "9.50" }
        }
    }

    return (
        <>
            <div className="pageHeadPCls">
                <div className="pageHeadCCls">
                    <form className="pageFormFCls">
                        <div className="pageFormPCls">
                            <div className="pageFormECls">
                                <div className="paymentHeadTitle">Payment Simulator</div>
                                <div className="fieldsHold">
                                    <div className="pageFormFieldCls">
                                        <label>Enter Transaction Amount</label>
                                        <input value={amount} onChange={handleAmount} placeholder="Enter Transaction Amount" id="transacAmount" name="transacAmount" type="number" maxLength="12" minLength="0" required></input>
                                    </div>
                                    <div className="pageFormFieldCls">
                                        <label>Enter IFSC Code</label>
                                        <input placeholder="IFSC code" id="ifscCode" name="ifscCode" type="text" maxLength="12" minLength="12" required></input>
                                    </div>
                                    <div className="pageFormFieldCls">
                                        <label>Select card type</label>
                                        <select value={cardType} onChange={handleCardType} name="cardType" id="cardType" placeholder="Select the card type" required>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Debit Card">Debit Card</option>
                                        </select>
                                    </div>
                                    <div className="pageFormFieldCls">
                                        <label>Select card network type</label>
                                        <select value={cardNetwork} onChange={handleCardNetwork} name="cardNetType" id="cardNetType" placeholder="Select the card network type" required>
                                            <option value="Visa">Visa</option>
                                            <option value="Mastercard">Mastercard</option>
                                            <option value="RuPay">RuPay</option>
                                            <option value="Discover">Discover</option>
                                        </select>
                                    </div>
                                    <div className="pageFormFieldCls">
                                        <label>Enter card number</label>
                                        <input placeholder="Enter card number" id="cardNumber" name="cardNumber" type="text" maxLength="16" minLength="16" required></input>
                                    </div>
                                    <div className="pageFormFieldCls">
                                        <label>Enter Expiry date</label>
                                        <input placeholder="MM YY" id="expiryDate" name="expiryDate" type="text" maxLength="4" minLength="4" required></input>
                                    </div>
                                    <div className="pageFormFieldCls">
                                        <label>Enter CVV number</label>
                                        <input placeholder="Enter CVV number" id="cvvNumber" name="cvvNumber" type="text" maxLength="3" minLength="3" required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="pageFormECls pageFormBtn">
                                <button type="button" name="formSubmit" id="formSubmit">Submit</button>
                                <button type="button" onClick={handleOpenModal} className="openModalBtnCls"></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal} className="modalHCls">
                <Modal.Header className="modalHeaderCls">
                    <Modal.Title className="modalHeadTitleCls">Options to save money</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBodyCls">
                    <div className="tableParentCls">
                        <div className="tableECls">
                            <div className="tableTitleECls">
                                <div className="TableHeadContCls">Card network</div>
                                <div className="TableHeadContCls">Card type</div>
                                <div className="TableHeadContCls">Discount you get</div>
                            </div>
                            <div className="tableContECls">
                                {renderRates.map((item, index) => (
                                    <div key={index} className="tableBodyECls">
                                        <div className="TableBodyContCls">{item.network}</div>
                                        <div className="TableBodyContCls">{item.type}</div>
                                        <div className="TableBodyContCls">{item.discount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalFooterCls">
                    <button onClick={handleCloseModal} className="modalCloseBtnCls">Close</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
