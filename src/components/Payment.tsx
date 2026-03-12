import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PaymentProps {
  totalPrice: number;
  onSuccess: () => void;
}

export default function Payment({ totalPrice, onSuccess }: PaymentProps) {
  const [method, setMethod] = useState<'card' | 'mpesa'>('card');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      setTimeout(onSuccess, 2000);
    }, 2000);
  };

  if (completed) {
    return (
      <div className="text-center py-20">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-20 h-20 text-emerald-500" />
        </motion.div>
        <h2 className="text-3xl font-serif mb-4">Payment Successful</h2>
        <p className="text-brand-muted">Your order is being processed. Thank you for shopping with us!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif mb-2">Payment Method</h2>
        <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Secure Checkout</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setMethod('card')}
          className={`p-6 border flex flex-col items-center gap-4 transition-all ${method === 'card' ? 'border-brand-burgundy bg-brand-burgundy/5' : 'border-black/10 hover:border-black/20'}`}
        >
          <CreditCard className={`w-8 h-8 ${method === 'card' ? 'text-brand-burgundy' : 'text-black/40'}`} />
          <span className="text-[11px] uppercase tracking-widest font-bold">Credit Card</span>
        </button>
        <button 
          onClick={() => setMethod('mpesa')}
          className={`p-6 border flex flex-col items-center gap-4 transition-all ${method === 'mpesa' ? 'border-brand-burgundy bg-brand-burgundy/5' : 'border-black/10 hover:border-black/20'}`}
        >
          <Smartphone className={`w-8 h-8 ${method === 'mpesa' ? 'text-brand-burgundy' : 'text-black/40'}`} />
          <span className="text-[11px] uppercase tracking-widest font-bold">M-Pesa</span>
        </button>
      </div>

      <div className="bg-brand-cream p-8 space-y-6">
        {method === 'card' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Card Number</label>
              <input type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-white border-b border-black/10 py-3 px-4 focus:outline-none focus:border-brand-burgundy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Expiry</label>
                <input type="text" placeholder="MM/YY" className="w-full bg-white border-b border-black/10 py-3 px-4 focus:outline-none focus:border-brand-burgundy" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">CVV</label>
                <input type="text" placeholder="•••" className="w-full bg-white border-b border-black/10 py-3 px-4 focus:outline-none focus:border-brand-burgundy" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Phone Number</label>
              <input type="text" placeholder="07XX XXX XXX" className="w-full bg-white border-b border-black/10 py-3 px-4 focus:outline-none focus:border-brand-burgundy" />
            </div>
            <p className="text-[10px] text-brand-muted leading-relaxed">
              You will receive an M-Pesa prompt on your phone to authorize the payment of <span className="font-bold text-brand-ink">${totalPrice.toFixed(2)}</span>.
            </p>
          </div>
        )}
      </div>

      <button 
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-brand-burgundy text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-mustard hover:text-brand-ink transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)} Now`}
      </button>
    </div>
  );
}
