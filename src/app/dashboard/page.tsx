import { Metadata } from 'next'

import DashboardClient from '@/components/admin/DashboardClient'
import { fetchDashboardData } from '@/lib/server/admin-dashboard'

export const metadata: Metadata = {
  title: 'لوحة تحكم Happy Time',
  description: 'إدارة المنتجات، المجموعات، والمحتوى المرئي لمتجر Happy Time'
}

export default async function DashboardPage() {
  const data = await fetchDashboardData()

  return (
    <main className="container py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-gray-600">
          قم بإدارة المنتجات، المجموعات، محتوى الصفحة الرئيسية، وإعدادات الواجهة المشتركة بين الويب والموبايل.
        </p>
      </header>
      <DashboardClient initialData={data} />
    </main>
  )
}
