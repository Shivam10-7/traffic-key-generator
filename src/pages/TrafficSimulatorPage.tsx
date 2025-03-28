
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import TrafficSimulator from '@/components/TrafficSimulator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, BarChart3, CarFront } from 'lucide-react';

const TrafficSimulatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-blue-100/30 to-transparent rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-t from-cyan-100/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      </div>
      
      <CustomNavbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block p-2 bg-blue-50 rounded-lg mb-6 animate-pulse hover:scale-110 transition-all duration-300">
              <CarFront className="h-12 w-12 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                AI Traffic Signal Simulator
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8 animate-fade-up [animation-delay:200ms]">
              Our advanced AI system analyzes traffic patterns and optimizes signal timings to reduce congestion.
            </p>
            <div className="flex justify-center gap-4 animate-fade-up [animation-delay:400ms]">
              <Button 
                asChild 
                variant="outline" 
                className="bg-white hover:bg-gray-50 shadow-sm transition-all duration-300 hover:scale-105"
              >
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  API Documentation
                </Link>
              </Button>
              <Button 
                asChild 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <Link to="/generator">
                  <BarChart3 className="mr-2 h-4 w-4 animate-pulse" />
                  Get API Access
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
