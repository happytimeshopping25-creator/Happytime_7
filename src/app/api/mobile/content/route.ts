import { NextRequest, NextResponse } from 'next/server'
import { dc } from '@/lib/data-connect'
import { authenticateMobileRequest } from '@/lib/api/mobile-auth'

export async function GET(request: NextRequest) {
  try {
    authenticateMobileRequest(request, { requiredRoles: ['reader'] })

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') ?? 'home'

    const [content] = await dc.content({
      page,
    })

    return NextResponse.json(content)
  } catch (error: any) {
    console.error('Failed to load mobile content:', error)
    return NextResponse.json({ error: 'Unable to load content' }, { status: 500 })
  }
}
