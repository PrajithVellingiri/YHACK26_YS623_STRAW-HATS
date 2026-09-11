import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6 relative">
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gov-teal/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="w-20 h-20 bg-teal-50 text-gov-teal rounded-full flex items-center justify-center shadow-inner relative z-10">
          <Sparkles className="w-10 h-10 animate-pulse" />
        </div>
        <div className="space-y-2 relative z-10">
          <h2 className="text-2xl font-extrabold text-gov-navy tracking-tight">Understanding your business...</h2>
          <p className="text-slate-500 font-medium">Identifying business characteristics and preparing your compliance requirements.</p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4 overflow-hidden relative z-10 shadow-inner">
          <div className="bg-gradient-to-r from-teal-400 to-gov-teal h-2 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gov-teal/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mb-10 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white shadow-soft border border-slate-200 text-gov-teal rounded-2xl mb-6">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-gov-navy mb-3 tracking-tight">Tell us about your business</h1>
        <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">Provide details below so our AI can accurately map out your regulatory compliance needs.</p>
      </div>

      <Card className="relative z-10 border-t-4 border-t-gov-teal">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-10">
              
              {/* Left Column: AI Assistance */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-gov-teal" />
                      <h4 className="font-extrabold text-gov-navy tracking-tight">AI Assistance (Optional)</h4>
                    </div>
                    <p className="text-slate-500 text-sm mb-4 font-medium leading-relaxed">
                      Describe what you want to do in plain English. Our AI will analyze your intent and pre-fill structured details.
                    </p>
                    <Textarea 
                      name="description"
                      placeholder="e.g., I want to start a small organic bakery in Coimbatore."
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Structured Data */}
              <div className="space-y-5">
                <h4 className="font-extrabold text-gov-navy tracking-tight border-b border-slate-100 pb-3">Structured Details</h4>
                <Input 
                  name="name"
                  label="Business Name" 
                  placeholder="e.g., ABC Bakery"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    name="sector"
                    label="Sector" 
                    placeholder="e.g., Food, Tech"
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

                <div className="grid grid-cols-2 gap-4">
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

            </div>
          </CardContent>
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end">
            <Button type="submit" size="lg" className="w-full sm:w-auto shadow-premium text-lg px-8">
              Analyze My Business
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
