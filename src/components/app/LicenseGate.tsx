import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, KeyRound, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

const LICENSE_STORAGE_KEY = 'eliteiq-license-key';

const LicenseGate = ({ children }: Props) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(LICENSE_STORAGE_KEY);
    if (stored) {
      verifyKey(stored, true);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyKey = async (key: string, silent = false) => {
    if (!silent) setVerifying(true);
    setError('');

    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const url = `https://${projectId}.supabase.co/functions/v1/admin-api/verify-license`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: anonKey,
        },
        body: JSON.stringify({ license_key: key.trim().toUpperCase() }),
      });

      const data = await res.json();

      if (!data.valid) {
        if (!silent) setError(data.error || 'Invalid license key.');
        setLoading(false);
        setVerifying(false);
        localStorage.removeItem(LICENSE_STORAGE_KEY);
        return;
      }

      localStorage.setItem(LICENSE_STORAGE_KEY, key.trim().toUpperCase());
      setPlan(data.plan || 'Pro');
      setVerified(true);
    } catch {
      if (!silent) setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) {
      setError('Please enter a license key.');
      return;
    }
    verifyKey(licenseKey);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (verified) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold">
              <span className="text-purple-400">Elite</span>{' '}
              <span className="text-white">IQ</span>
            </span>
          </div>
          <p className="text-white/50 text-sm">Enter your license key to continue</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <KeyRound className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">License Activation</h2>
              <p className="text-white/40 text-xs">One-time activation required</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                value={licenseKey}
                onChange={e => {
                  setLicenseKey(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="ELITE-XXXX-XXXX-XXXX-XXXX"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/25 h-11 font-mono tracking-wider text-center text-sm focus-visible:ring-cyan-500/50"
                disabled={verifying}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={verifying}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white h-11 font-medium shadow-lg shadow-cyan-500/20"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Activate License
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-white/30 text-[11px]">
              Don't have a license?{' '}
              <a href="/pricing" className="text-cyan-400 hover:text-cyan-300 underline">
                Purchase here
              </a>
            </p>
          </div>
        </div>

        <p className="text-white/20 text-[10px] text-center mt-4">
          Your license key is stored locally and verified securely.
        </p>
      </div>
    </div>
  );
};

export default LicenseGate;
