'use client'

import './comments.scss'
import {EditArea} from "./edit";
import {ListArea} from "./list";
import * as React from "react";
import {getLanguageProvider} from "@/services/common/language";

export function CommentsClient({lang, portalUrl, resource}: {
    lang: string,
    portalUrl: string,
    resource: string
}) {
    const langProvider = getLanguageProvider(lang)
    return <div className={'commentsContainer'}>
        <EditArea portalUrl={portalUrl} resource={resource} langProvider={langProvider}/>
        <ListArea portalUrl={portalUrl} resource={resource}/>
    </div>
}
