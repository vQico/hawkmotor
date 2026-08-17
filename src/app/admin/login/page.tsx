'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert, Key, Mail, Sparkles, Home, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { loginAdmin } from '@/app/actions/authActions';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const res = await loginAdmin(null, formData);

    if (res.success) {
      // Login successful, redirect to dashboard
      router.push('/admin');
      router.refresh();
    } else {
      setError(res.error || 'Giriş yapılamadı.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060606] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-brand-primary/30">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-white transition-all flex items-center gap-2"
      >
        <Home className="w-4 h-4 text-brand-primary" /> Ana Sayfa
      </Link>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo and Greeting */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-primary to-amber-500 text-white flex items-center justify-center relative shadow-lg mb-4">
            <Key className="w-7 h-7" />
            <span className="absolute inset-0 rounded-full border border-brand-primary/40 animate-ping opacity-25 pointer-events-none" />
          </div>
          
          <h1 className="text-2xl font-black tracking-[0.2em] uppercase leading-none text-white">
            HAWK<span className="text-brand-primary">MOTOR</span>
          </h1>
          <span className="text-[10px] tracking-[0.4em] font-semibold text-brand-muted uppercase mt-1.5">
            KONTROL PANELİ GİRİŞİ
          </span>
        </div>

        {/* Glassmorphic Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl glass-panel-heavy border border-white/10 shadow-2xl flex flex-col gap-6"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 flex items-start gap-2.5"
            >
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider">Yetkilendirme Hatası</p>
                <p className="font-light mt-0.5">{error}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* E-mail Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Admin E-posta</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hawkmotor.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
                />
                <Mail className="w-4 h-4 text-brand-muted absolute left-4 top-3.5" />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Giriş Şifresi</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 pr-11 text-sm text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
                />
                <Key className="w-4 h-4 text-brand-muted absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-brand-muted hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs transition-all duration-300 orange-glow flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Yetkiyi Doğrula & Giriş Yap
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Secure watermark */}
          <div className="flex items-center justify-center gap-1.5 text-[9px] text-brand-muted uppercase tracking-widest pt-2 border-t border-white/5">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" /> 256-BIT SSL GÜVENLİ OTURUM
          </div>
        </motion.div>
      </div>
    </main>
  );
}
