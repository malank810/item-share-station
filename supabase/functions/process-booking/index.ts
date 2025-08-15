import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user) throw new Error("User not authenticated");

    const { bookingId, action } = await req.json();

    // Get booking details
    const { data: booking } = await supabaseClient
      .from("bookings")
      .select("*, listings(*)")
      .eq("id", bookingId)
      .single();

    if (!booking) throw new Error("Booking not found");

    // Check if user is the owner
    if (booking.owner_id !== user.id) {
      throw new Error("Unauthorized: Only the owner can process bookings");
    }

    let newStatus;
    switch (action) {
      case "approve":
        newStatus = "approved";
        break;
      case "reject":
        newStatus = "rejected";
        break;
      case "complete":
        newStatus = "completed";
        break;
      default:
        throw new Error("Invalid action");
    }

    // Update booking status
    const { error: updateError } = await supabaseClient
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", bookingId);

    if (updateError) throw updateError;

    // If approving, block dates in availability
    if (action === "approve") {
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      const dates = [];
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push({
          listing_id: booking.listing_id,
          date: d.toISOString().split('T')[0],
          is_available: false,
        });
      }

      const { error: availabilityError } = await supabaseClient
        .from("availability")
        .upsert(dates, { onConflict: "listing_id,date" });

      if (availabilityError) throw availabilityError;
    }

    return new Response(
      JSON.stringify({ success: true, status: newStatus }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Booking processing failed:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});