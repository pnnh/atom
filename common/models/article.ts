import {PSChannelModel} from "@/atom/common/models/channel";


export interface PSArticleModel {
    urn: string
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
}

export interface PSArticleMetadataModel {
    urn: string
    image: string
    description: string
    title: string
    tags: string
}

export interface PSArticleFileModel {
    name: string
    path: string
    type: string
}

export function channelName(channel: string | PSChannelModel): string {
    if (typeof channel === 'string') {
        return channel
    }
    return channel.name
}