import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { addDays, differenceInDays } from "date-fns";
import type { DateRange } from "react-day-picker";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: {
    id: string;
    title: string;
    price: number;
    user_id: string;
  };
}

const BookingModal = ({ isOpen, onClose, listing }: BookingModalProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const calculateTotal = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const days = differenceInDays(dateRange.to, dateRange.from) + 1;
    return days * listing.price;
  };

  const handleBooking = async () => {
    if (!user || !dateRange?.from || !dateRange?.to) return;

    setLoading(true);
    try {
      const totalPrice = calculateTotal();
      
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          listing_id: listing.id,
          renter_id: user.id,
          owner_id: listing.user_id,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0],
          total_price: totalPrice,
          message: message,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Booking Request Sent",
        description: "Your booking request has been sent to the owner for approval.",
      });

      onClose();
      setDateRange(undefined);
      setMessage("");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "Failed to create booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book {listing.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Select Dates</h4>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Message to Owner (Optional)</h4>
            <Textarea
              placeholder="Any special requests or questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {dateRange?.from && dateRange?.to && (
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex justify-between">
                <span>Price per day:</span>
                <span>${listing.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Days:</span>
                <span>{differenceInDays(dateRange.to!, dateRange.from!) + 1}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBooking} 
              disabled={!dateRange?.from || !dateRange?.to || loading}
              className="flex-1"
            >
              {loading ? "Booking..." : "Request Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;