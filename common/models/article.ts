import {PSChannelModel} from "@/atom/common/models/channel";


export interface PSArticleModel {
    title: string
    header: string
    body: string
    create_time: string
    update_time: string
    creator: string
    keywords: string
    description: string
    cover: string
    discover: number
    owner: string
    channel: string
    partition: string
    path: string
    uid: string
}

export interface PSArticleMetadataModel {
    uid: string
    image: string
    description: string
    title: string
    tags: string
}

export interface PSArticleFileModel {
    title: string
    path: string
    is_dir: boolean
    is_text: boolean
    is_image: boolean
    storage_path: string
}

export function channelName(channel: string | PSChannelModel): string {
    if (typeof channel === 'string') {
        return channel
    }
    return channel.name
}
