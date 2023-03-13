import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    console.log("chheckout_sessions executed");
    if(req.method === "POST") {
        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: req.body.items,
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/`
            });
            console.log(req.body);
            console.log(session);

            // IF SUCCESS, ADD BALANCE
            const updateUserResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/user/update`, {
                method: "POST",
                body: JSON.stringify({
                    email: req.body.email,
                    credits: 10
                }),
              });
            console.log(updateUserResponse);

            res.status(200).json(session);
        } catch(err) {
            res.status(500).json({ statusCode: 500, message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Methot nod allowed');
    }
}