//Form page

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { categories, validateMpesaMessage } from '../tickets.js';

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        phone: '',
        message: '',
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validateMpesaMessage(formData.message, formData.category);
        if (result.ok) {
            navigate('/success', { state: { formData } });
        } else {
            setError(result.error);
        }
    };

    return (
        <main className="min-h-dvh">
            <header className="poster">
                <div className="mx-auto max-w-xl px-5 pt-12 pb-28 sm:pt-16">
                    <h1 className="poster-title">
                        <span className="block text-mango">Zumba</span>
                        <span className="block">Dance</span>
                    </h1>
                    <p className="mt-5 max-w-sm text-lg leading-snug text-white/85">
                        Book your ticket, pay with M-Pesa, and get a QR code to show at the gate.
                    </p>
                </div>
            </header>

            <form
                onSubmit={handleSubmit}
                className="sheet mx-auto -mt-16 max-w-xl px-5 pb-12"

            >
                <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(43,15,58,0.45)] sm:p-9">
                    <Step number="1" title="Your details">
                        <div className="grid gap-4">
                            <Field label="Full name" name="name" autoComplete="name" onChange={handleChange} />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Email" name="email" type="email" autoComplete="email" onChange={handleChange} />
                                <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="07XX XXX XXX" onChange={handleChange} />
                            </div>
                        </div>
                    </Step>

                    <Step number="2" title="Choose your ticket">
                        <fieldset>
                            <legend className="sr-only">Ticket category</legend>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.entries(categories).map(([value, { label, price }]) => (
                                    <label key={value} className="tile">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={value}
                                            checked={formData.category === value}
                                            onChange={handleChange}
                                            required
                                            className="peer sr-only"
                                        />
                                        <span className="tile-face">
                                            <span className="text-sm font-semibold">{label}</span>
                                            <span className="tile-price">
                                                <span className="text-sm font-semibold">Ksh</span> {price}
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </Step>

                    <Step number="3" title="Pay and paste your message" last>
                        <p className="-mt-1 mb-4 text-muted">
                            Send the ticket price by M-Pesa, then paste the confirmation SMS you receive.
                        </p>
                        <label htmlFor="message" className="sr-only">M-Pesa confirmation message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            onChange={handleChange}
                            aria-invalid={error ? 'true' : undefined}
                            aria-describedby={error ? 'message-error' : undefined}
                            placeholder="e.g. TFK7ABC12X Confirmed. Ksh500.00 sent to…"
                            className="input resize-y leading-relaxed"
                        />
                        {error && (
                            <p id="message-error" role="alert" className="error mt-3">
                                {error}
                            </p>
                        )}
                    </Step>

                    <button type="submit" className="cta mt-8 w-full">
                        Get my ticket
                    </button>
                </div>
            </form>
        </main>
    );
}

function Step({ number, title, last, children }) {
    return (
        <section className={last ? '' : 'mb-9'}>
            <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink">
                <span className="step-dot" aria-hidden="true">{number}</span>
                {title}
            </h2>
            {children}
        </section>
    );
}

function Field({ label, name, type = 'text', ...props }) {
    return (
        <label className="grid gap-1.5">
            <span className="text-sm font-semibold text-ink">{label}</span>
            <input name={name} type={type} required className="input" {...props} />
        </label>
    );
}
