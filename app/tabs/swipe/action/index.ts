'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

export async function getRandomUser() {
  const supabase = await createSupabaseServerClient();

  const startIndex = Math.floor(Math.random() * 24);

  return supabase
    .from('user')
    .select('*')
    .range(startIndex, startIndex + 4);
}
