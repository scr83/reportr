import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireUser();
    const body = await request.json();

    const { companyName, website, supportEmail, primaryColor, logo, whiteLabelEnabled, plan, planExpires } = body;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(companyName !== undefined && { companyName }),
        ...(website !== undefined && { website }),
        ...(supportEmail !== undefined && { supportEmail }),
        ...(primaryColor && { primaryColor }),
        ...(logo !== undefined && { logo }),
        ...(whiteLabelEnabled !== undefined && { whiteLabelEnabled }),
        ...(plan && { plan }),
        ...(planExpires !== undefined && { planExpires: planExpires ? new Date(planExpires) : null }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update profile' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await requireUser();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
