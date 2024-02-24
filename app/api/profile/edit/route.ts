import { NextResponse } from 'next/server';
import createSupabaseServerClient from '@/lib/supabase/server';

export async function POST(req: Request) {
  const { data } = await req.json();
  const supabase = await createSupabaseServerClient();

  console.log('요청이 다음처럼 들어옴', data);

  const result = await supabase.from('user').insert(data).single();

  console.log(result);
  try {
    if (!result.error) {
      return NextResponse.json(result.statusText, { status: result.status });
    }
    return NextResponse.json(
      {
        message: 'DB를 넣는 로직에서, 잘못된 값이 들어갔음을 확인함',
        error: result.error,
      },
      { status: result.status }
    );
  } catch (e) {
    return NextResponse.json({ error: '서버내부오류 발생' }, { status: 500 });
  }
}

// export async function GET() {
//   // you should fetch user`s notification-setting-info from userDB
//   try {
//     return NextResponse.json({ notifications: true }, { status: 200 });
//   } catch (e) {
//     return NextResponse.json({ error: 'error while ' }, { status: 500 });
//   }
// }
