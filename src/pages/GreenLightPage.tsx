
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import GreenLightCalculator from '@/components/GreenLightCalculator';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, BarChart3, LogOut, CarFront, TrafficCone } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Card } from '@/components/ui/card';

const GreenLightPage = () => {
  const { user, logout, isAdmin } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <CustomNavbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="inline-block p-2 bg-green-50 rounded-lg mb-6">
              <TrafficCone className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Smart Green Light Optimizer</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Advanced AI-powered system that optimizes traffic flow by calculating precise green light timings based on real-time vehicle detection.
            </p>
            
            {user && (
              <>
                <Card className="mb-6 p-4 bg-white border-0 shadow-sm">
                  <div className="flex justify-center items-center gap-3">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <CarFront className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isAdmin ? 'Administrator' : 'Viewer'}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={logout}
                      className="ml-2 bg-white"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </Card>
                
                {isAdmin && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-center justify-center text-blue-800">
                    <div className="font-medium">Administrator Access</div>
                    <div className="text-sm ml-2">You have full access to modify traffic data</div>
                  </div>
                )}
                
                {!isAdmin && (
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-6 flex items-center justify-center text-gray-700">
                    <div className="font-medium">Viewer Access</div>
                    <div className="text-sm ml-2">You can view but not modify traffic data</div>
                  </div>
                )}
              </>
            )}
            
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" className="bg-white hover:bg-gray-50 shadow-sm">
                <Link to="/simulator">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Traffic Simulator
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-white hover:bg-gray-50 shadow-sm">
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  API Documentation
                </Link>
              </Button>
            </div>
          </div>
          
          {!user ? (
            <div className="max-w-md mx-auto">
              <Card className="p-6 border-0 shadow-sm">
                <LoginForm />
              </Card>
            </div>
          ) : (
            <GreenLightCalculator isAdmin={isAdmin} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GreenLightPage;
