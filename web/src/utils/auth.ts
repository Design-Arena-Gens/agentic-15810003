import type { UserProfile } from "@/types";
import { nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "neocart_users";

interface StoredUser extends UserProfile {
  password: string;
}

const DEFAULT_USERS: StoredUser[] = [
  {
    id: "admin",
    name: "Store Admin",
    email: "admin@neocart.com",
    password: "admin123",
    role: "admin",
    avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=Admin",
    token: "jwt-admin",
  },
];

const loadUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUsers(DEFAULT_USERS);
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(raw) as StoredUser[];
    const missingDefaults = DEFAULT_USERS.filter(
      (defaultUser) =>
        !parsed.some(
          (user) => user.email.toLowerCase() === defaultUser.email.toLowerCase(),
        ),
    );
    if (missingDefaults.length > 0) {
      const merged = [...parsed, ...missingDefaults];
      saveUsers(merged);
      return merged;
    }
    return parsed;
  } catch (error) {
    console.error("Failed to load users from storage", error);
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const signUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<UserProfile> => {
  const users = loadUsers();
  const existing = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
  if (existing) {
    throw new Error("Account already exists. Please sign in instead.");
  }
  const token = `jwt-${nanoid()}`;
  const user: StoredUser = {
    id: nanoid(),
    name,
    email,
    password,
    role: "customer",
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`,
    token,
  };
  saveUsers([...users, user]);
  const { password: passwordToOmit, ...profile } = user;
  void passwordToOmit;
  return profile;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserProfile> => {
  const users = loadUsers();
  const user = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }
  const { password: passwordToOmit, ...profile } = user;
  void passwordToOmit;
  return profile;
};
