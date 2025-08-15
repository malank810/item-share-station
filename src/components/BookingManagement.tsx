import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, MessageSquare, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import MessagingModal from "./MessagingModal";
import PaymentModal from "./PaymentModal";

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  message?: string;
  created_at: string;
  renter_id: string;
  owner_id: string;
  listings: {
    id: string;
    title: string;
    image_url?: string;
  };
}

const BookingManagement = () => {
  const [bookingsAsOwner, setBookingsAsOwner] = useState<Booking[]>([]);
  const [bookingsAsRenter, setBookingsAsRenter] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch bookings where user is the owner
      const { data: ownerBookings, error: ownerError } = await supabase
        .from("bookings")
        .select(`
          *,
          listings (id, title, image_url)
        `)
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (ownerError) throw ownerError;

      // Fetch bookings where user is the renter
      const { data: renterBookings, error: renterError } = await supabase
        .from("bookings")
        .select(`
          *,
          listings (id, title, image_url)
        `)
        .eq("renter_id", user.id)
        .order("created_at", { ascending: false });

      if (renterError) throw renterError;

      setBookingsAsOwner(ownerBookings || []);
      setBookingsAsRenter(renterBookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: string, action: string) => {
    try {
      const { error } = await supabase.functions.invoke("process-booking", {
        body: { bookingId, action },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${action}d successfully`,
      });

      fetchBookings();
    } catch (error) {
      console.error("Error processing booking:", error);
      toast({
        title: "Error",
        description: `Failed to ${action} booking`,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock },
      approved: { variant: "default" as const, icon: CheckCircle },
      rejected: { variant: "destructive" as const, icon: XCircle },
      completed: { variant: "default" as const, icon: CheckCircle },
      cancelled: { variant: "destructive" as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;

    return (
      <Badge variant={config?.variant || "secondary"} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderBookingCard = (booking: Booking, isOwner: boolean) => {
    const otherUserId = isOwner ? booking.renter_id : booking.owner_id;

    return (
      <Card key={booking.id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {booking.listings.image_url && (
              <img
                src={booking.listings.image_url}
                alt={booking.listings.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{booking.listings.title}</h4>
              <p className="text-sm text-muted-foreground">
                {isOwner ? "Booking Request" : "Your Booking"}
              </p>
              <p className="text-sm">
                {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge(booking.status)}
                <span className="font-semibold">${booking.total_price}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowMessaging(true);
                }}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Chat
              </Button>
              
              {isOwner && booking.status === "pending" && (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleBookingAction(booking.id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleBookingAction(booking.id, "reject")}
                  >
                    Reject
                  </Button>
                </>
              )}
              
              {!isOwner && booking.status === "approved" && (
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowPayment(true);
                  }}
                >
                  <CreditCard className="w-4 h-4 mr-1" />
                  Pay Now
                </Button>
              )}
            </div>
          </div>
          
          {booking.message && (
            <div className="mt-3 p-2 bg-muted rounded text-sm">
              <strong>Message:</strong> {booking.message}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading bookings...</div>;
  }

  return (
    <>
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received">Received Requests ({bookingsAsOwner.length})</TabsTrigger>
          <TabsTrigger value="sent">My Bookings ({bookingsAsRenter.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Requests for Your Items</CardTitle>
            </CardHeader>
            <CardContent>
              {bookingsAsOwner.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No booking requests yet.
                </p>
              ) : (
                bookingsAsOwner.map((booking) => renderBookingCard(booking, true))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Booking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {bookingsAsRenter.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No bookings made yet.
                </p>
              ) : (
                bookingsAsRenter.map((booking) => renderBookingCard(booking, false))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedBooking && (
        <>
          <MessagingModal
            isOpen={showMessaging}
            onClose={() => {
              setShowMessaging(false);
              setSelectedBooking(null);
            }}
            otherUserId={
              selectedBooking.renter_id === user?.id ? selectedBooking.owner_id : selectedBooking.renter_id
            }
            otherUserName="User"
            bookingId={selectedBooking.id}
          />
          
          <PaymentModal
            isOpen={showPayment}
            onClose={() => {
              setShowPayment(false);
              setSelectedBooking(null);
            }}
            booking={selectedBooking}
            onPaymentSuccess={fetchBookings}
          />
        </>
      )}
    </>
  );
};

export default BookingManagement;