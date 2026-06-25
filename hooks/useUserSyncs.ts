import { useUserStore } from '@/store/userStore';
import { useUser } from '@clerk/expo';
import { useEffect } from 'react';
import { useSupabase } from './useSupabase';

export const useUserSyncs = () => {
  const { user } = useUser();
  const setIsAdmin = useUserStore((state) => state.setIsAdmin);
  const setIsUserSynced = useUserStore((state) => state.setIsUserSynced);
  const resetUser = useUserStore((state) => state.resetUser);
  const authSupabaase = useSupabase();

  useEffect(() => {
    if (!user) {
      resetUser();
      return;
    }

    let cancelled = false;

    const syncUser = async () => {
      setIsUserSynced(false);

      const { data } = await authSupabaase
        .from('users')
        .select('clerk_id, is_admin')
        .eq('clerk_id', user.id)
        .single();

      if (cancelled) return;

      if (data) {
        setIsAdmin(data.is_admin ?? false);
        setIsUserSynced(true);
        return;
      }

      const { data: newUser } = await authSupabaase
        .from('users')
        .insert({
          clerk_id: user.id,
          email: user.emailAddresses[0].emailAddress,
          is_admin: false,
          first_name: user.firstName,
          last_name: user.lastName,
          avatar_url: user.imageUrl,
        })
        .select('is_admin')
        .single();

      if (cancelled) return;

      setIsAdmin(newUser?.is_admin ?? false);
      setIsUserSynced(true);
    };

    syncUser();

    return () => {
      cancelled = true;
    };
  }, [user, authSupabaase, setIsAdmin, setIsUserSynced, resetUser]);
};
