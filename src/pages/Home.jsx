//Form page

import { useState } from 'react';
import {useNavigate} from "react-router";

const categories = {
    parents: 500,
    youth: 300,
    kids: 200,
};

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        phone: '',
        message: '',
    });

    const navigate = useNavigate();

    const validateMpesaMessage = (message, category) => {
        const amountRegex = /Ksh\s?(\d+(\.\d+)?)/i;
        const nameRegex = /to\s([A-Z\s]+)/i;

        const amountMatch = message.match(amountRegex);
        const nameMatch = message.match(nameRegex);

        if (!amountMatch || !nameMatch) return false;

        const paidAmount = parseFloat(amountMatch[1]);
        const payeeName = nameMatch[1].trim();

        return (
            paidAmount === categories[category] &&
                payeeName === 'DEMO ORGANISER'
        );
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateMpesaMessage(formData.message, formData.category);
        if (valid) {
            navigate('/success', {state: {formData}});
        } else {
            alert('Invalid M-pesa message. Please check your details.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Welcome to Zumba Dance Ticketing</h2>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
            <select name="category" onChange={handleChange} value={formData.category} required>
                <option value="">Select Category</option>
                <option value="parents">Parents - Ksh 500</option>
                <option value="youth">Youth - Ksh 300</option>
                <option value="kids">Kids - Ksh 200</option>
            </select>
            <textarea name="message" placeholder="Paste M-pesa Message here" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
}