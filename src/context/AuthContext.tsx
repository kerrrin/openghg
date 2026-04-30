
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type AuthContextType = {
  user:       User | null;
  session:    Session | null;
  loading:    boolean;
  signOut:    () => Promise<void>;
  signInAnon: () => Promise<void>;
};

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
  user:       null,
  session:    null,
  loading:    true,
  signOut:    async () => {},
  signInAnon: async () => {},
});

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const [user,    setUser]    = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Signs the user out and clears session.
   */
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, [supabase]);

  /**
   * Signs in anonymously — creates a session without credentials.
   * User can later upgrade by adding email + password.
   */
  const signInAnon = useCallback(async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error("[AuthContext] anonymous sign in failed:", error.message);
    }
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, signInAnon }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

/**
 * Hook to access auth context from any client component.
 * @example
 * const { user, loading, signOut } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}