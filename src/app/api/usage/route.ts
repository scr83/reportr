import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth-helpers';
import { getUsageStats } from '@/lib/plan-limits';

// Force dynamic rendering for usage API
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await requireUser();

    const usage = await getUsageStats(user.id);
    return NextResponse.json(usage);
  } catch (error: any) {
    console.error('Error fetching usage:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch usage stats' },
      { status: 500 }
    );
  }
}