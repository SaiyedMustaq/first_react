import { useAuth } from "@clerk/expo";
import { useMemo } from "react";
import { createClerkSupabaseClient } from "../app/lib/supabase";

export function useSupabase() {
    const { getToken } = useAuth();
    const client = useMemo(
        () => createClerkSupabaseClient(async () => {
            const token = await getToken();
            if (!token) throw new Error("No auth token available");
            return token;
        }),
        [getToken]
    );
    return client;
}