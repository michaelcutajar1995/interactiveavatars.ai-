const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }

  // Handle successful payment
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    
    try {
      await resend.emails.send({
        from: 'Glimpse <onboarding@resend.dev>',
        to: session.customer_email,
        subject: 'Welcome to Premium!',
        html: `
          <h1>Welcome to Premium!</h1>
          <p>Thank you for your purchase! Your premium features are now active.</p>
          <p>Your plan: ${session.metadata.tierName}</p>
        `
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
}; 