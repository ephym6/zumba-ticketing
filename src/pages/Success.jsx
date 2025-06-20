//Ticket display page

import {useLocation, useNavigate} from "react-router";
import QRCode from "qrcode.react";

export default function Success() {
    const navigate = useNavigate();
    const location = useLocation();
    const {formData} = location.state;

    if (!formData) {
        navigate("/");
        return null;
    }

    const qrCodeValue = JSON.stringify(formData);

    return (
        <div className="success">
            <h2>✅ Payment Validated</h2>
            <p>Your ticket has been generated successfully.</p>
            <p>Please scan the QR code below to view your ticket.</p>
            <p>Name: {formData.name}</p>
            <p>Category: {formData.category}</p>
            <QRCode value={qrCodeValue} size={256} />
            <p>Show this QR at the event gate!</p>
        </div>
    );
}