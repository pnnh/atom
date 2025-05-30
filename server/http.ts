'use server'


import {cookies} from "next/headers";

export async function serverMakePost<T>(url: string, params: unknown): Promise<T> {

    const cookieStore = await cookies()
    const authHeader = cookieStore.toString()

    const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
            Cookie: authHeader,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
    return response.json()
}

export async function serverMakeGet<T>(url: string): Promise<T> {

    const cookieStore = await cookies()
    const authHeader = cookieStore.toString()

    const response = await fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
            Cookie: authHeader,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}
