import { buffer } from 'micro';
import Stripe from 'stripe';
import { Resend } from 'resend';

// Configure API to handle raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      try {
        await resend.emails.send({
          from: 'Glimpse <onboarding@resend.dev>',
          to: session.customer_email,
          subject: 'Welcome to Premium!',
          html: `
            <h1>Welcome to Premium!</h1>
            <p>Thank you for your purchase! Your premium features are now active.</p>
            <p>Your plan: ${session.metadata?.tierName || 'Premium'}</p>
          `
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).json(`Webhook Error: ${err.message}`);
  }
}