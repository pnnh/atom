'use server'

import {AccountModel} from "@/atom/common/models/account";
import {CodeOk, PLGetResult, PLInsertResult} from "@/atom/common/models/protocol";
import {serverMakeGet} from "@/atom/server/http";
import {getDefaultImageUrl} from "@/services/common/note";

export async function serverGetUserinfo(portalUrl: string): Promise<AccountModel> {
    const url = `${portalUrl}/account/userinfo`
    const getResult = await serverMakeGet(url) as PLGetResult<AccountModel>
    if (!getResult || getResult.code !== CodeOk || !getResult.data) {
        throw new Error('获取用户信息失败')
    }
    const userInfo = getResult.data
    if (!userInfo.uid) {
        throw new Error('用户信息不完整')
    }
    if (userInfo.photo) {
        userInfo.photoUrl = userInfo.photo.startsWith('http://') || userInfo.photo.startsWith("https://") ?
            userInfo.photo : `${portalUrl}/storage${userInfo.photo}`
    } else {
        userInfo.photoUrl = getDefaultImageUrl()
    }
    return userInfo
}
