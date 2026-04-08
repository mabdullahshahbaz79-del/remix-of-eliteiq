import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "mabdullahwork0@gmail.com";

export function useAdmin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email === ADMIN_EMAIL) {
        setSession(data.session);
      }
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      if (sess?.user?.email === ADMIN_EMAIL) setSession(sess);
      else setSession(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.functions.invoke("admin-api/login", {
      body: { email, password },
    });
    if (error) throw new Error("Login failed");
    if (data?.error) throw new Error(data.error);
    if (data?.session) {
      await supabase.auth.setSession(data.session);
      setSession(data.session);
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const adminFetch = useCallback(async (endpoint: string, method = "GET", body?: any) => {
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const token = currentSession?.access_token;
    if (!token) throw new Error("Not authenticated");

    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const url = `https://${projectId}.supabase.co/functions/v1/admin-api/${endpoint}`;
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Request failed");
    return json;
  }, []);

  return { session, loading, login, logout, adminFetch, isAdmin: !!session };
}
