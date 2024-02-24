'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

type UserInfo = {
  name: string;
  region1: string;
  region2: string;
  self_description: string;
  field: string;
  job_status: string;
  mbti: string;
};

export async function addUserInfo({
  name,
  region1,
  region2,
  field,
  job_status,
  mbti,
  self_description,
}: UserInfo) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from('user')
    .insert({ name, region1, region2, field, job_status, mbti, self_description })
    .single();

  return JSON.stringify(result);
}

// type UserImage = {
//   userImage: File;
// };

// export async function uploadImage({ userImage }: UserImage) {
//   const supabase = await createSupabaseServerClient();
//
//   console.log('여기 실행됨...?');
//
//   const { data, error } = await supabase.storage
//     .from('images')
//     .upload('public/avatar1.png', userImage, {
//       cacheControl: '3600',
//       upsert: false,
//     });
//
//   return JSON.stringify(data);
// }
