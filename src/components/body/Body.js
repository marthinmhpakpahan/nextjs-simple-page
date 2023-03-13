import styles from "../../styles/Home.module.css";
import { Grid, Button, Item } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { useState } from 'react';
import getStripe from '@/lib/get-stripe';

export default function Body() {
    const { data: session } = useSession();
    const [redirecting, setRedirecting] = useState(false);

    const redirectToCheckout = async () => {
      // Create Stripe checkout
      const {
        data: { id },
      } = await axios.post('/api/checkout_sessions', {
        items: [{
          price: "price_1MkW8BL2hWPyj1mdycoi916r",
          quantity: 1
        }],
      });
  
      // Redirect to checkout
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: id });
    };

    return (
        <div className={styles.customBody}>
            {session ? (
              // <Button variant="contained">Subscribe Now</Button>
              <Button
                onClick={redirectToCheckout}
                disabled={redirecting}
                className="border rounded py-2 px-6 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-500 max-w-max mt-4"> 
                {redirecting ? 'Redirecting...' : 'Buy Credits'}
              </Button>
            ) : (
                <h3>Please login first to subscribe our plan!</h3>
            )}
        </div>
    );
}