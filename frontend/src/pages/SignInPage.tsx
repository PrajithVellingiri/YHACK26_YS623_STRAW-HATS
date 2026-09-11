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
            id: "1",
            compliance_id: 1,
            name: "Food Safety License (FSSAI)",
            department: "Health",
            required: true,
            description: "Mandatory license for food businesses",
            documents: ["ID Proof", "Address Proof", "Food Safety Plan"],
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden w-full">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gov-teal/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gov-blue/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center">
          <ShieldCheck className="h-12 w-12 text-gov-teal" />
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300">
            Or{' '}
            <Link to="/signup" className="font-bold text-gov-teal hover:text-teal-400 transition-colors">
              create a new account
            </Link>
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-md shadow-premium border-slate-200">
          <CardContent className="pt-8">
            <form className="space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-5">
                {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
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
                  <a href="#" className="font-bold text-gov-blue hover:text-blue-700 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" variant="primary" className="w-full text-lg shadow-premium hover:-translate-y-1" isLoading={isLoading}>
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-slate-400 font-bold uppercase tracking-wider text-xs">Hackathon Demo Credentials</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-extrabold text-gov-navy mb-2 flex items-center gap-1.5"><Info className="w-4 h-4 text-gov-teal"/> Business Owner</h4>
                  <div className="grid grid-cols-[60px_1fr] gap-1 text-slate-600 text-sm">
                    <span className="font-bold">Email:</span> <span>business@demo.com</span>
                    <span className="font-bold">Pass:</span> <span>DemoBusiness123</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-extrabold text-gov-navy mb-2 flex items-center gap-1.5"><Info className="w-4 h-4 text-gov-blue"/> Government Officer</h4>
                  <div className="grid grid-cols-[60px_1fr] gap-1 text-slate-600 text-sm">
                    <span className="font-bold">Email:</span> <span>officer@demo.com</span>
                    <span className="font-bold">Pass:</span> <span>DemoOfficer123</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-extrabold text-gov-navy mb-2 flex items-center gap-1.5"><Info className="w-4 h-4 text-amber-500"/> System Admin</h4>
                  <div className="grid grid-cols-[60px_1fr] gap-1 text-slate-600 text-sm">
                    <span className="font-bold">Email:</span> <span>admin@demo.com</span>
                    <span className="font-bold">Pass:</span> <span>DemoAdmin123</span>
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