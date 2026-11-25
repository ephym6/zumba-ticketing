//Ticket display page

import { Link, Navigate, useLocation } from 'react-router';
import { QRCodeSVG } from 'qrcode.react';
import { categories, getTransactionCode } from '../tickets.js';

export default function Success() {
    const location = useLocation();
    const formData = location.state?.formData;

    if (!formData) {
        return <Navigate to="/" replace />;
    }

    const qrCodeValue = JSON.stringify(formData);
    const ticket = categories[formData.category];
    const transactionCode = getTransactionCode(formData.message);
    const firstName = formData.name.trim().split(/\s+/)[0];

    return (
        <main className="poster min-h-dvh">
            <div className="mx-auto max-w-md px-5 py-12 sm:py-16">
                <h1 className="poster-title text-[clamp(3rem,14vw,4.5rem)]">
                    You're in, <span className="text-mango">{firstName}</span>
                </h1>
                <p className="mt-3 text-lg text-white/85">
                    Payment checked. Here's your ticket.
                </p>

                <article className="ticket mt-9" aria-label="Your Zumba Dance ticket">
                    <div className="ticket-top">
                        <p className="ticket-event">Zumba Dance</p>
                        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
                            <div className="col-span-2">
                                <dt className="ticket-label">Ticket holder</dt>
                                <dd className="ticket-value">{formData.name}</dd>
                            </div>
                            <div>
                                <dt className="ticket-label">Ticket</dt>
                                <dd className="ticket-value">{ticket.label}</dd>
                            </div>
                            <div>
                                <dt className="ticket-label">Paid</dt>
                                <dd className="ticket-value">Ksh {ticket.price}</dd>
                            </div>
                            {transactionCode && (
                                <div className="col-span-2">
                                    <dt className="ticket-label">M-Pesa code</dt>
                                    <dd className="ticket-value tracking-wider">{transactionCode}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    <div className="ticket-tear" aria-hidden="true" />

                    <div className="ticket-stub">
                        <QRCodeSVG
                            value={qrCodeValue}
                            size={200}
                            fgColor="#21142A"
                            bgColor="#FFFFFF"
                            marginSize={0}
                            title="Ticket QR code"
                            className="h-auto w-full max-w-[200px]"
                        />
                        <p className="mt-4 text-center text-sm font-semibold text-ink">
                            Show this QR code at the gate
                        </p>
                    </div>
                </article>

                <p className="mt-8 text-center">
                    <Link to="/" className="link-light">Book another ticket</Link>
                </p>
            </div>
        </main>
    );
}
