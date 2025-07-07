'use client'

import {getVisitorId} from "@/atom/client/comments/fingerprint";
import {makeGet, makePost} from "@/atom/client/http";
import {AccountModel} from "@/atom/common/models/account";
import {PLGetResult, PLInsertResult} from "@/atom/common/models/protocol";
import {IAuthApp} from "@/photon/common/models/auth";

export async function submitSignup(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/signup`
    return await makePost(url, submitRequest) as PLInsertResult<AccountModel>
}

export async function accountSignin(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/signin`
    return await makePost(url, submitRequest) as PLInsertResult<AccountModel>
}

export async function accountSignout(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/signout`
    return await makePost(url, submitRequest)
}

export async function getUserinfo(portalUrl: string) {
    const url = `${portalUrl}/account/userinfo`
    return await makeGet(url) as PLGetResult<AccountModel>
}

export async function queryAuthApp(portalUrl: string, appName: string) {
    const url = `${portalUrl}/account/auth/app?app=${encodeURIComponent(appName)}`
    return await makeGet(url) as PLGetResult<IAuthApp>
}

export async function permitAppLogin(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/auth/permit`
    return await makePost(url, submitRequest) as PLInsertResult<AccountModel>
}
