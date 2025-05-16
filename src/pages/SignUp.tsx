
import React, { useState } from 'react';
import Logo from '../components/Logo';
import AuthButton from '../components/AuthButton';
import { Link } from 'react-router-dom';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/hooks/use-toast';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      toast({
        title: "Erro",
        description: "Você precisa concordar com os termos de serviço",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    const api_url_register = "https://api-softwareai.rshare.io/api/register";
    
    fetch(api_url_register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false);
      
      if (data.error) {
        toast({
          title: "Erro",
          description: data.error,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Sucesso",
        description: "Registro realizado com sucesso!",
        variant: "default"
      });

      // Armazena email para uso futuro
      localStorage.setItem("userEmail", email);
      
      // Redireciona após registro
      setTimeout(() => {
        window.location.href = "https://softwareai.rshare.io/chat";
      }, 1000);
    })
    .catch(err => {
      setIsLoading(false);
      toast({
        title: "Erro",
        description: "Erro de rede",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="mt-6 text-3xl font-bold">Create your account</h1>
        </div>

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
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms} 
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)} 
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>
          </div>

          <AuthButton type="submit" disabled={!agreeToTerms || isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </AuthButton>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
