import { redirect } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const [user] = useAuthState(auth)

    if (!user) {
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
}