'use client';

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authSuccess } from "@/store/authSlice";
import type { UserProfile } from "@/types";

export default function AuthHydrator() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("neocart_session");
      if (raw) {
        const profile = JSON.parse(raw) as UserProfile;
        dispatch(authSuccess(profile));
      }
    } catch (error) {
      console.error("Failed to hydrate auth session", error);
    }
  }, [dispatch, user]);

  return null;
}
