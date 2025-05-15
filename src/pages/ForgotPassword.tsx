
import React, { useState } from 'react';
import Logo from '../components/Logo';
import AuthButton from '../components/AuthButton';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação da requisição para o backend
    // Aqui você implementaria a chamada real para o endpoint de recuperação de senha
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast({
        title: "Email enviado",
        description: "Se existir uma conta com este email, você receberá instruções para redefinir sua senha.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="mt-6 text-3xl font-bold">Reset your password</h1>
          {!submitted && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          )}
        </div>

        {!submitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email"
                />
              </div>
            </div>

            <AuthButton type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </AuthButton>
          </form>
        ) : (
          <div className="mt-8 space-y-6 text-center">
            <div className="p-4 bg-green-50 rounded-md border border-green-100">
              <p className="text-green-800">
                Reset link sent! Check your email inbox and follow the instructions to reset your password.
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-center">
          <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
