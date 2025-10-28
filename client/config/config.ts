'use client'

import {decodeBase58String} from "@/atom/common/utils/basex";

export function useClientConfig(encodedBrowserConfig?: string): any {
    if (encodedBrowserConfig) {
        const configText = decodeBase58String(encodedBrowserConfig)
        return JSON.parse(configText)
    }
    const lgEnv = document.getElementById('LGEnv') as HTMLInputElement
    if (!lgEnv) {
        throw Error('没有找到 LGEnv 元素，无法获取配置')
    }
    if (!lgEnv.value) {
        throw Error('LGEnv 元素没有内容，无法获取配置')
    }
    const configText = decodeBase58String(lgEnv.value)
    return JSON.parse(configText)
}
