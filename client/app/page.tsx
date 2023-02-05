"use client";
import { DailyNoteForm } from "@/components/home/DailyNoteForm";
import { LoginPage } from "@/components/login/Login";
import { setSession } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const currentSession = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });
  }, []);

  return (
    <main className="z-0 min-h-screen min-w-full p-10">
      {!currentSession ? <LoginPage /> : <DailyNoteForm />}
    </main>
  );
}
