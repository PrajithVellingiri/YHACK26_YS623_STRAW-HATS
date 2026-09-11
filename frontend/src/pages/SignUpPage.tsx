import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck } from 'lucide-react';

import { signup } from '../services/api';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "CITIZEN"
      });
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Signup failed");
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link to="/signin" className="font-bold text-gov-teal hover:text-teal-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-md shadow-premium border-slate-200">
          <CardContent className="pt-8">
            <form className="space-y-5" onSubmit={handleSignUp}>
              <Input
                label="Full Name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                error={error}
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full text-lg shadow-premium hover:-translate-y-1" isLoading={isLoading}>
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
