import { create } from "zustand";
import { User } from "@supabase/supabase-js";

type ProfileState = {
  profile: User | undefined;
  setProfile: (user: User | undefined) => void;
};

export const useProfile = create<ProfileState>((set) => ({
  profile: undefined,
  setProfile: (user: User | undefined) =>
    set((state) => ({
      profile: (state.profile = user),
    })),
}));
