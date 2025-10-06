import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name must be less than 100 characters'),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color format'),
  logo: z.string().url('Invalid URL format').optional(),
})

// GET /api/users/profile - Fetch current user profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        companyName: true,
        primaryColor: true,
        logo: true,
        plan: true,
        planExpires: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            clients: true,
            reports: true,
          }
        }
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        ...user,
        clientCount: user._count.clients,
        reportCount: user._count.reports,
      }
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/users/profile - Update user profile and branding
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate request data
    const validationResult = updateProfileSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid data', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { name, companyName, primaryColor, logo } = validationResult.data

    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        name,
        companyName,
        primaryColor,
        logo: logo || null,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        companyName: true,
        primaryColor: true,
        logo: true,
        plan: true,
        planExpires: true,
        updatedAt: true,
      }
    })

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/profile - Soft delete user account
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check if user has active clients or reports
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        _count: {
          select: {
            clients: true,
            reports: true,
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // For now, we'll just mark the account for deletion rather than actually deleting
    // In production, you'd want to:
    // 1. Export user data
    // 2. Cancel subscriptions
    // 3. Schedule data deletion after retention period
    
    const deletedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        // Anonymize user data
        name: 'Deleted User',
        email: `deleted-${session.user.id}@example.com`,
        image: null,
        logo: null,
        // Keep company branding for data integrity
      }
    })

    return NextResponse.json({
      message: 'Account deletion initiated',
      details: {
        clientsAffected: user._count.clients,
        reportsAffected: user._count.reports,
        dataRetentionDays: 30, // Example retention period
      }
    })
  } catch (error) {
    console.error('Error deleting user account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}