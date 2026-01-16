import { SignInForm } from "@/components/auth/sign-in-form"

/**
 * Sign-in page component.
 * Renders the sign-in form in a centered layout.
 * 
 * @returns {JSX.Element} Sign-in page with SignInForm component
 */
export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-black p-4">
            <SignInForm />
        </div>
    )
}
