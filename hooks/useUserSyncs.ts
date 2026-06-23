import { useUserStore } from '@/store/userStore';
import { useUser } from '@clerk/expo';
import { useEffect } from 'react';
import { useSupabase } from './useSupabase';
export const useUserSyncs = () => {
    const {user}= useUser();
    console.log("user changed", user);
    const setIsAdmin=useUserStore((state)=>state.setIsAdmin);
    const authSupabaase = useSupabase();

    useEffect(()=>{
        if(!user) return;
        syncUser();}, [user]);

        const syncUser = async () => {
         const  { data } = await authSupabaase.from('users').
            select('clerk_id, is_admin').eq('clerk_id', user!.id).
            single();
            if(data){
                setIsAdmin(data.is_admin??false);
                return;
            }

            const {data:newUser}=await authSupabaase.from('users').insert({
                clerk_id: user!.id,
                email: user!.emailAddresses[0].emailAddress,
                is_admin: false,
                first_name: user!.firstName,
                last_name: user!.lastName,
                avatar_url: user!.imageUrl,
            }).select("is_admin")
            .single();
            setIsAdmin(newUser?.is_admin??false);
        }


}