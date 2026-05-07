"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// ── Types ──

type AuthContextType = {
  user:       User | null;
  session:    Session | null;
  loading:    boolean;
  signOut:    () => Promise<void>;
  signInAnon: () => Promise<void>;
};

// ── Context ──

const AuthContext = createContext<AuthContextType>({
  user:       null,
  session:    null,
  loading:    true,
  signOut:    async () => {},
  signInAnon: async () => {},
});

// ── Supabase client ──

const supabase = createClient();

// ── Provider ──

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const signInAnon = useCallback(async () => {
    await supabase.auth.signInAnonymously();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, signInAnon }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──

export function useAuth() {
  return useContext(AuthContext);
}
