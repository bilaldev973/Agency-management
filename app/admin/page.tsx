"use client"

import { useAuth } from "@/hooks/use-auth"
import { SignIn } from "@/components/auth/sign-in"
import { PageHeader } from "@/components/page-header"

export default function AdminPage() {
  const { user, isAdmin } = useAuth()

  return (
    <div>
      <PageHeader
        title="Admin"
        description={isAdmin ? "Welcome back, admin!" : "Please sign in to continue"}
      />

      <div className="max-w-md mx-auto px-4 py-16">
        {!user && <SignIn />}
        {user && !isAdmin && (
          <p className="text-center text-red-600">
            You don&apos;t have admin access. Please contact the administrator.
          </p>
        )}
        {user && isAdmin && (
          <div className="text-center">
            <a
              href="/admin/jobs/new"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post a Job
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
