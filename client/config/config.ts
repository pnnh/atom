'use client'

import {IBrowserConfig} from "@/services/common/config";
import {decodeBase58String} from "@/atom/common/utils/basex";
import {usePublicConfig, useServerConfig} from "@/services/server/config";

export async function useClientConfig() {
    // run on server side
    if (typeof window === 'undefined') {
        const serverConfig = await useServerConfig()
        return usePublicConfig(serverConfig)
    }
    const lgEnv = document.getElementById('LGEnv') as HTMLInputElement
    if (!lgEnv) {
        throw Error('没有找到 LGEnv 元素，无法获取配置')
    }
    if (!lgEnv.value) {
        throw Error('LGEnv 元素没有内容，无法获取配置')
    }
    const configText = decodeBase58String(lgEnv.value)
    const clientConfig: IBrowserConfig = JSON.parse(configText)
    return clientConfig
}
