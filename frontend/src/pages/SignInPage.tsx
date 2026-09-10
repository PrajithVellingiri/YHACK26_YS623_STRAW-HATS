import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck, User, Shield, Settings } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const demoLogin = (role: 'business' | 'officer' | 'admin') => {
    if (role === 'business') navigate('/dashboard');
    if (role === 'officer') navigate('/officer');
    if (role === 'admin') navigate('/admin');
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
                <Button variant="outline" onClick={() => demoLogin('business')} className="w-full flex items-center justify-center gap-2">
                  <User className="w-4 h-4 text-text-muted" /> Business Owner
                </Button>
                <Button variant="outline" onClick={() => demoLogin('officer')} className="w-full flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-[#00E5FF]" /> Government Officer
                </Button>
                <Button variant="outline" onClick={() => demoLogin('admin')} className="w-full flex items-center justify-center gap-2">
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
