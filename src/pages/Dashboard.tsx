import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingManagement from "@/components/BookingManagement";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, TrendingUp, Star } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your rentals, bookings, and track your earnings.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingManagement />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;