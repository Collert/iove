import { useNavigate, redirect } from "react-router-dom";

export function checkFetchErrors (response) {
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('User not logged in. Redirecting to login page.', {cause:401})
        }
    }
}

export function HandleHTTPErrors (error) {
    // const navigate = useNavigate()
    console.error(error)
    if (error.cause === 401) {
        return (redirect('/login'))
    }
}

export function useHandleHTTPErrors (error) {
    const navigate = useNavigate()
    let route = ''
    if (error) {
        console.error(error)
        if (error.cause === 401) {
            route = '/login'
        }
    }
    return navigate(route)
}