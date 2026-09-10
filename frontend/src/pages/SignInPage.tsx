import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck, User, Shield, Settings } from 'lucide-react';

import { signin, signup } from '../services/api';

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

  const demoLogin = async (roleType: 'business' | 'officer' | 'admin') => {
    setIsLoading(true);
    setError('');
    
    let creds = { email: '', password: '', name: '', role: '' };
    let destination = '';
    
    if (roleType === 'business') {
      creds = { email: 'business@demo.com', password: 'DemoBusiness123', name: 'Demo Business Owner', role: 'CITIZEN' };
      destination = '/dashboard';
    } else if (roleType === 'officer') {
      creds = { email: 'officer@demo.com', password: 'DemoOfficer123', name: 'Demo Government Officer', role: 'OFFICER' };
      destination = '/officer';
    } else if (roleType === 'admin') {
      creds = { email: 'admin@demo.com', password: 'DemoAdmin123', name: 'Demo System Admin', role: 'ADMIN' };
      destination = '/admin';
    }

    try {
      let response;
      try {
        response = await signin({ email: creds.email, password: creds.password });
      } catch (signinErr: any) {
        // If sign in fails (e.g., account doesn't exist), try to sign up
        try {
          response = await signup({ name: creds.name, email: creds.email, password: creds.password, role: creds.role });
        } catch (signupErr: any) {
          throw new Error('Failed to create demo account: ' + (signupErr.message || 'Unknown error'));
        }
      }
      
      localStorage.setItem('user', JSON.stringify(response));
      navigate(destination);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
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
                  <span className="bg-card px-2 text-text-muted">Demo Role Selection</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <Button type="button" variant="outline" onClick={() => demoLogin('business')} disabled={isLoading} className="w-full flex items-center justify-center gap-2">
                  <User className="w-4 h-4 text-text-muted" /> Business Owner
                </Button>
                <Button type="button" variant="outline" onClick={() => demoLogin('officer')} disabled={isLoading} className="w-full flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-[#00E5FF]" /> Government Officer
                </Button>
                <Button type="button" variant="outline" onClick={() => demoLogin('admin')} disabled={isLoading} className="w-full flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4 text-accent-yellow" /> System Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};