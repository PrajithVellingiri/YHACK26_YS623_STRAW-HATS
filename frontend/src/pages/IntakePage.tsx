import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Sparkles, Building2 } from 'lucide-react';
import { analyzeBusiness } from '../services/api';

export const IntakePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    name: '',
    sector: '',
    state: '',
    businessSize: '',
    businessStage: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // In a real app, we might store this in a context or global state.
      // For this hackathon MVP, we can simulate saving to local storage or passing via state.
      const response = await analyzeBusiness(formData);
      localStorage.setItem('businessProfile', JSON.stringify(response.business));
      localStorage.setItem('compliances', JSON.stringify(response.compliances));
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to analyze business:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Understanding your business...</h2>
          <p className="text-gray-500">Identifying business characteristics and preparing your compliance requirements.</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
          <div className="bg-blue-600 h-2 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4">
          <Building2 className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your business</h1>
        <p className="text-gray-600">Provide details below so we can accurately determine your compliance needs.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 items-start">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 text-sm mb-1">AI Assistance (Optional)</h4>
                <p className="text-blue-800 text-sm">
                  Describe what you want to do in your own words. Our AI will help fill in the structured details.
                </p>
                <div className="mt-3">
                  <Textarea 
                    name="description"
                    placeholder="e.g., I want to start a small bakery in Coimbatore."
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Input 
                name="name"
                label="Business Name" 
                placeholder="e.g., ABC Bakery"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  name="sector"
                  label="Sector" 
                  placeholder="e.g., Food, Retail, Tech"
                  value={formData.sector}
                  onChange={handleChange}
                  required
                />
                <Select 
                  name="state"
                  label="State / Location"
                  value={formData.state}
                  onChange={handleChange}
                  options={[
                    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
                    { label: 'Karnataka', value: 'Karnataka' },
                    { label: 'Maharashtra', value: 'Maharashtra' },
                    { label: 'Delhi', value: 'Delhi' },
                  ]}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select 
                  name="businessSize"
                  label="Business Size"
                  value={formData.businessSize}
                  onChange={handleChange}
                  options={[
                    { label: 'Micro', value: 'Micro' },
                    { label: 'Small', value: 'Small' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'Large', value: 'Large' },
                  ]}
                  required
                />
                <Select 
                  name="businessStage"
                  label="Business Stage"
                  value={formData.businessStage}
                  onChange={handleChange}
                  options={[
                    { label: 'Starting', value: 'Starting' },
                    { label: 'Operating', value: 'Operating' },
                    { label: 'Expanding', value: 'Expanding' },
                  ]}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Analyze My Business
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
