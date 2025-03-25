'use client'

import './comments.scss'
import {EditArea} from "./edit";
import {ListArea} from "./list";
import * as React from "react";

export function CommentsClient({portalUrl, resource}: { portalUrl: string, resource: string }) {
    return <div className={'commentsContainer'}>
        <EditArea portalUrl={portalUrl} resource={resource}/>
        <ListArea portalUrl={portalUrl} resource={resource}/>
    </div>
}
