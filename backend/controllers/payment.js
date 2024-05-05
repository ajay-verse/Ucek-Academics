import Payment from "../models/payment.js"

export default function PaymentController() {
    return {
        createPayment: async ({ roll, name, email, purpose, amount, payment_id, status, order_id, signature }) => {
            try {
                const pay = new Payment({
                    roll: roll,
                    name: name,
                    email: email,
                    purpose: purpose,
                    amount: amount,
                    payment_id: payment_id,
                    order_id: order_id,
                    signature: signature,
                    status: status
                })
                const result = await pay.save()
                return result
            } catch (e) {
                return { ...e, errno: 401 }
            }
        }
    }
}