import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-background text-foreground">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-muted-foreground">
        This page doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 text-primary underline underline-offset-4"
      >
        Go home
      </Link>
    </div>
  )
}
