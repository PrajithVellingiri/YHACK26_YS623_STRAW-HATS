import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Info } from 'lucide-react';

import { signin } from '../services/api';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await signin({ email, password });
      
      // Store user info in localStorage for future use
      localStorage.setItem('user', JSON.stringify(response));

      // Auto-populate local mock data for the Business Owner demo
      if (email === 'business@demo.com' && !localStorage.getItem('businessProfile')) {
        localStorage.setItem('businessProfile', JSON.stringify({
          name: "Fresh Foods Cafe",
          description: "A healthy food cafe",
          sector: "Food",
          state: "Tamil Nadu",
          businessSize: "Small",
          businessStage: "Starting"
        }));
        localStorage.setItem('compliances', JSON.stringify([
          {
            id: "comp_demo_1",
            name: "Food Safety License (FSSAI)",
            department: "Health",
            requirement_type: "License",
            description: "Mandatory license for food businesses",
            required_documents: ["ID Proof", "Address Proof", "Food Safety Plan"],
            status: "SUBMITTED"
          }
        ]));
      }

      // Redirect based on role
      if (response.role === 'ADMIN') {
        navigate('/admin');
      } else if (response.role === 'OFFICER') {
        navigate('/officer');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <ShieldCheck className="h-12 w-12 text-accent-green drop-shadow-[0_0_10px_rgba(174,255,0,0.5)]" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            Or{' '}
            <Link to="/signup" className="font-medium text-accent-green hover:text-[#9BE600]">
              create a new account
            </Link>
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-4">
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="#" className="font-medium text-accent-yellow hover:text-[#E6A600]">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-text-muted font-medium uppercase tracking-wider text-xs">Hackathon Demo Credentials</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-gray-800 p-3 rounded-md text-xs border border-gray-700">
                  <h4 className="font-bold text-gray-300 mb-1 flex items-center gap-1"><Info className="w-3 h-3"/> Business Owner</h4>
                  <div className="grid grid-cols-[60px_1fr] gap-1 text-gray-400">
                    <span className="font-semibold">Email:</span> <span>business@demo.com</span>
                    <span className="font-semibold">Pass:</span> <span>DemoBusiness123</span>
                  </div>
                </div>

                <div className="bg-gray-800 p-3 rounded-md text-xs border border-gray-700">
                  <h4 className="font-bold text-[#00E5FF] mb-1 flex items-center gap-1"><Info className="w-3 h-3"/> Government Officer</h4>
                  <div className="grid grid-cols-[60px_1fr] gap-1 text-gray-400">
                    <span className="font-semibold">Email:</span> <span>officer@demo.com</span>
                    <span className="font-semibold">Pass:</span> <span>DemoOfficer123</span>
                  </div>
                </div>

                <div className="bg-gray-800 p-3 rounded-md text-xs border border-gray-700">
                  <h4 className="font-bold text-accent-yellow mb-1 flex items-center gap-1"><Info className="w-3 h-3"/> System Admin</h4>
                  <div className="grid grid-cols-[60px_1fr] gap-1 text-gray-400">
                    <span className="font-semibold">Email:</span> <span>admin@demo.com</span>
                    <span className="font-semibold">Pass:</span> <span>DemoAdmin123</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};