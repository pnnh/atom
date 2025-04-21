import {getVisitorId} from "@/atom/client/comments/fingerprint";
import {PLInsertResult, PLSelectResult} from "@/atom/common/models/protocol";
import {PSCommentModel} from "@/atom/common/models/comment";
import {makeGet, makePost} from "@/atom/client/http";


export async function submitComment(portalUrl: string, submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    const url = `${portalUrl}/portal/comments`
    return await makePost(url, submitRequest) as PLInsertResult<PSCommentModel>
}

export async function fetchComments({portalUrl, resource}: { portalUrl: string, resource: string }) {
    const fingerprint = await getVisitorId()
    const url = `${portalUrl}/portal/comments?resource=` + resource + '&fingerprint=' + fingerprint
    return await makeGet<PLSelectResult<PSCommentModel>>(url)
}
