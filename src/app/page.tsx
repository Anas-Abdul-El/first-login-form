import Link from "next/link"

/**
 * Home page component.
 * Displays a link to the sign-in page.
 * 
 * @returns {JSX.Element} Home page with sign-in link
 */
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans p-4">
      <Link className="text-white" href="/sign-in">Sign In</Link>
    </div>
  )
}
