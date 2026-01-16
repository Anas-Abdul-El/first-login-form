import { LoginForm } from "@/components/auth/login-form"

/**
 * Login page component.
 * Renders the login form in a centered layout.
 * 
 * @returns {JSX.Element} Login page with LoginForm component
 */
export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-black p-4">
            <LoginForm />
        </div>
    )
}