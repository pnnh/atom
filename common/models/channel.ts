
export interface PSChannelModel {
    name: string
    create_time: string
    update_time: string
    creator: string
    description: string
    image: string
    profile: string
}

export interface MTChannelModel extends PSChannelModel {
    uid: string
}

export interface PSChannelMetadataModel {
    uid: string
    urn: string
    image: string,
    description: string,
    name: string
}
