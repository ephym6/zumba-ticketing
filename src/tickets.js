// Ticket categories and M-Pesa message checks, shared by both pages.

// The organiser's registered M-Pesa name. Set VITE_PAYEE_NAME in a local .env file
// (see .env.example); the demo falls back to a placeholder name.
export const PAYEE_NAME = (import.meta.env.VITE_PAYEE_NAME || 'DEMO ORGANISER').trim().toUpperCase();

export const categories = {
    parents: { label: 'Parents', price: 500 },
    youth: { label: 'Youth', price: 300 },
    kids: { label: 'Kids', price: 200 },
};

// Returns { ok: true } or { ok: false, error } with a message the attendee can act on.
export function validateMpesaMessage(message, category) {
    const amountMatch = message.match(/Ksh\s?(\d+(\.\d+)?)/i);
    const nameMatch = message.match(/to\s([A-Z\s]+)/i);

    if (!amountMatch || !nameMatch) {
        return {
            ok: false,
            error: "This doesn't look like an M-Pesa confirmation. Paste the whole SMS, starting with the transaction code.",
        };
    }

    const paidAmount = parseFloat(amountMatch[1]);
    const payeeName = nameMatch[1].trim().replace(/\s+/g, ' ').toUpperCase();
    const ticket = categories[category];

    if (paidAmount !== ticket.price) {
        return {
            ok: false,
            error: `This payment is Ksh ${paidAmount}, but a ${ticket.label} ticket costs Ksh ${ticket.price}. Choose the ticket you paid for.`,
        };
    }

    if (payeeName !== PAYEE_NAME) {
        return {
            ok: false,
            error: "This payment wasn't sent to the event organiser. Check the recipient in your M-Pesa message.",
        };
    }

    return { ok: true };
}

// M-Pesa messages start with a 10-character transaction code, e.g. "TFK7ABC12X Confirmed."
export function getTransactionCode(message) {
    const match = message.match(/\b([A-Z0-9]{10})\s+Confirmed/i);
    return match ? match[1].toUpperCase() : null;
}
