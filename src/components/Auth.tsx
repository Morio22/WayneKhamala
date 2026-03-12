import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';

export default function Auth({ onAuthSuccess }: { onAuthSuccess?: () => void }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (onAuthSuccess) onAuthSuccess();
    } catch (err: any) {
      if (isSignIn) {
        setError('Email or password is incorrect');
      } else {
        if (err.code === 'auth/email-already-in-use') {
          setError('User already exists. Please sign in');
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 shadow-2xl rounded-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif mb-2">Wayne Khamala</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-cream border-b border-black/10 py-3 px-4 focus:outline-none focus:border-brand-burgundy transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-cream border-b border-black/10 py-3 px-4 focus:outline-none focus:border-brand-burgundy transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-brand-burgundy text-xs font-medium text-center">{error}</p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-burgundy text-white py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-mustard hover:text-brand-ink transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError(null);
            }}
            className="text-[10px] uppercase tracking-widest font-bold border-b border-black/20 pb-1 hover:border-brand-burgundy transition-colors"
          >
            {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
