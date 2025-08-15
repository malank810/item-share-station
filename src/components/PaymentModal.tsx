import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51234567890abcdef..."); // Replace with your Stripe publishable key

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    total_price: number;
    listings: { title: string };
  };
  onPaymentSuccess: () => void;
}

const PaymentForm = ({ booking, onClose, onPaymentSuccess }: Omit<PaymentModalProps, "isOpen">) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      // Create payment intent
      const { data, error } = await supabase.functions.invoke("create-payment-intent", {
        body: {
          bookingId: booking.id,
          amount: booking.total_price,
        },
      });

      if (error) throw error;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.client_secret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (stripeError) throw stripeError;

      if (paymentIntent.status === "succeeded") {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
        onPaymentSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium">{booking.listings.title}</h4>
        <p className="text-2xl font-bold">${booking.total_price}</p>
      </div>

      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handlePayment} disabled={loading || !stripe} className="flex-1">
          {loading ? "Processing..." : `Pay $${booking.total_price}`}
        </Button>
      </div>
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose, booking, onPaymentSuccess }: PaymentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <PaymentForm booking={booking} onClose={onClose} onPaymentSuccess={onPaymentSuccess} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;