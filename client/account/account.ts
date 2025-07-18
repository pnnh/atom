'use client'

import {getVisitorId} from "@/atom/client/comments/fingerprint";
import {clientMakeGet, clientMakePost} from "@/atom/client/http";
import {AccountModel} from "@/atom/common/models/account";
import {PLGetResult, PLInsertResult} from "@/atom/common/models/protocol";
import {IAuthApp} from "@/photon/common/models/auth";

export async function submitSignup(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/signup`
    return await clientMakePost(url, submitRequest) as PLInsertResult
}

export async function accountSignin(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/signin`
    return await clientMakePost<PLInsertResult>(url, submitRequest)
}

export async function accountSignout(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/signout`
    return await clientMakePost(url, submitRequest)
}

export async function getUserinfo(portalUrl: string) {
    const url = `${portalUrl}/account/userinfo`
    return await clientMakeGet(url) as PLGetResult<AccountModel>
}

export async function queryAuthApp(portalUrl: string, appName: string) {
    const url = `${portalUrl}/account/auth/app?app=${encodeURIComponent(appName)}`
    return await clientMakeGet(url) as PLGetResult<IAuthApp>
}

export async function permitAppLogin(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/account/auth/permit`
    return await clientMakePost(url, submitRequest) as PLInsertResult
}
