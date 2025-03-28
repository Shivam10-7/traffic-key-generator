
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import TrafficSimulator from '@/components/TrafficSimulator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, BarChart3, CarFront } from 'lucide-react';

const TrafficSimulatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <CustomNavbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block p-2 bg-blue-50 rounded-lg mb-6">
              <CarFront className="h-12 w-12 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">AI Traffic Signal Simulator</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Our advanced AI system analyzes traffic patterns and optimizes signal timings to reduce congestion.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" className="bg-white hover:bg-gray-50 shadow-sm">
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  API Documentation
                </Link>
              </Button>
              <Button asChild className="bg-blue-500 hover:bg-blue-600">
                <Link to="/green-light">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Green Light Calculator
                </Link>
              </Button>
            </div>
          </div>
          
          <TrafficSimulator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrafficSimulatorPage;
