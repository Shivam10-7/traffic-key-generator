
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash, Upload, RefreshCw, Camera, CarFront } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const TrafficSimulator = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [greenTimes, setGreenTimes] = useState<number[]>([0, 0, 0, 0]);
  const [vehicleData, setVehicleData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const apiUrl = 'https://6683-34-45-39-6.ngrok-free.app/upload';

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files);
    setError(null);
    setSuccess(false);

    if (selectedFiles.length !== 4) {
      setError('Please select exactly 4 images.');
      toast({
        variant: "destructive",
        title: "Invalid selection",
        description: "Please select exactly 4 images."
      });
      setImageFiles([]);
      setImages([]);
      return;
    }

    setImageFiles(selectedFiles);

    // Create preview URLs for displaying the images
    const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setImages(imagePreviews);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      
      if (droppedFiles.length !== 4) {
        setError('Please select exactly 4 images.');
        toast({
          variant: "destructive",
          title: "Invalid selection",
          description: "Please select exactly 4 images."
        });
        return;
      }
      
      setImageFiles(droppedFiles);
      const imagePreviews = droppedFiles.map(file => URL.createObjectURL(file));
      setImages(imagePreviews);
    }
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(imageUrl => URL.revokeObjectURL(imageUrl));
    };
  }, [images]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFiles.length !== 4) {
      setError('Please select exactly 4 images.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select exactly 4 images."
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Create FormData object
    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      console.log(`Sending request to: ${apiUrl}`);

      // Make POST request to Flask server
      const response = await axios.post(
        apiUrl,
        formData,
        {
          timeout: 120000, // 2 minute timeout for image processing
        }
      );

      console.log('Server Response:', response.data);

      // Check if response has the expected data
      if (response.data && 
          Array.isArray(response.data.green_light_times) && 
          Array.isArray(response.data.vehicle_data)) {
          
        setGreenTimes(response.data.green_light_times);
        setVehicleData(response.data.vehicle_data);
        setSuccess(true);
        toast({
          title: "Success",
          description: "Traffic signal timings calculated successfully."
        });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err: any) {
      console.error('Error processing images:', err);
      setError(`Error: ${err.message}`);
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Draw images with bounding boxes
  useEffect(() => {
    if (images.length === 4 && vehicleData.length === 4) {
      images.forEach((src, index) => {
        const canvas = canvasRefs.current[index];
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const img = new Image();
        img.onload = () => {
          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Set image opacity (0.8 = 80% opaque)
          ctx.globalAlpha = 0.8;
          
          // Draw image
          ctx.drawImage(img, 0, 0);
          
          // Reset opacity for drawing bounding boxes
          ctx.globalAlpha = 1.0;
          
          // Draw bounding boxes
          if (vehicleData[index] && vehicleData[index].vehicles) {
            vehicleData[index].vehicles.forEach((vehicle: any) => {
              const [x1, y1, x2, y2] = vehicle.bbox;
              ctx.strokeStyle = 'red';
              ctx.lineWidth = 2;
              ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
              ctx.fillStyle = 'red';
              ctx.font = '16px Arial';
              ctx.fillText(vehicle.label, x1, y1 - 10);
            });
          }
        };
        img.src = src;
      });
    }
  }, [images, vehicleData]);

  // Clear all data
  const handleReset = () => {
    setImages([]);
    setImageFiles([]);
    setGreenTimes([0, 0, 0, 0]);
    setVehicleData([]);
    setError(null);
    setSuccess(false);
    toast({
      title: "Reset",
      description: "All data has been cleared."
    });
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Image Upload Form */}
      <Card className="mb-8 border-0 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold text-blue-700">Upload Intersection Images</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Select 4 images of traffic at different intersection approaches for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div 
              className={cn(
                "p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-200",
                isDragging ? "border-blue-500 bg-blue-50/50" : "border-gray-300 bg-gray-50/50",
                "hover:border-blue-400 hover:bg-blue-50/30"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <div className="mb-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Drag & Drop Images</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload 4 different intersection approach images
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-white hover:bg-blue-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </Button>
              </div>
            </div>

            {/* Image Previews with Canvas */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                {images.map((src, index) => (
                  <div key={index} className="relative group transition-all duration-300 hover:scale-105">
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-md shadow-sm z-10">
                      Lane {index + 1}
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-md bg-white border border-gray-100 transition-all duration-300 group-hover:shadow-lg">
                      <canvas 
                        ref={el => canvasRefs.current[index] = el}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                type="submit" 
                disabled={isLoading || imageFiles.length !== 4}
                className="flex-1 bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:shadow-md"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Calculate Signal Timings
                  </>
                )}
              </Button>

              <Button 
                type="button" 
                onClick={handleReset}
                variant="outline"
                className="bg-white hover:bg-red-50 transition-all duration-300"
              >
                <Trash className="w-4 h-4 mr-2 text-red-500" />
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-6 animate-fade-down">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {success && (
        <Alert className="mb-6 border-green-200 text-green-800 bg-green-50 animate-fade-down">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Traffic signal timings calculated.</AlertDescription>
        </Alert>
      )}

      {/* Traffic Signal Display */}
      {success && (
        <Card className="mb-8 border-0 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm animate-fade-up">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl font-bold text-center text-blue-700">
              AI-Optimized Traffic Signal Timings
            </CardTitle>
            <CardDescription className="text-center">
              Calculated based on real-time vehicle detection and traffic flow analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {greenTimes.map((time, index) => (
                <div key={index} className="p-6 bg-white border rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-3 text-lg font-medium text-center flex items-center justify-center gap-2">
                    <CarFront className="h-5 w-5 text-blue-500" />
                    <span>Lane {index + 1}</span>
                  </div>

                  {/* Traffic Light */}
                  <div className="relative mx-auto mb-6 w-24 h-64 bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-between">
                    {/* Red light */}
                    <div className={`w-16 h-16 rounded-full ${time === 0 ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-red-900/30'} border-4 border-gray-700`}></div>
                    <div className="w-16 h-16 rounded-full bg-yellow-900/30 border-4 border-gray-700"></div>
                    <div className={`w-16 h-16 rounded-full ${time > 0 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-green-900/30'} border-4 border-gray-700 flex items-center justify-center text-white font-bold text-xl`}>
                      {time > 0 && `${time}s`}
                    </div>
                  </div>

                  <div className="flex justify-between p-3 text-sm bg-gray-100 rounded-lg">
                    <span>Vehicles Detected:</span>
                    <span className="font-bold">{vehicleData[index]?.count || 0}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 text-sm text-center text-muted-foreground bg-blue-50 rounded-lg border border-blue-100">
              <p>
                Green light timings are calculated based on detected vehicles.
                Each vehicle adds 5 seconds to the base time (minimum 15s, maximum 60s).
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrafficSimulator;
