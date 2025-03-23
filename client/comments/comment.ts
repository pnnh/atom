import {getVisitorId} from "@/atom/client/comments/fingerprint";
import {PLInsertResult, PLSelectResult} from "@/atom/common/models/protocol";
import {PSCommentModel} from "@/atom/common/models/comment";
import {makeGet, makePost} from "@/atom/client/http";


export async function submitComment(submitRequest: any) {
    submitRequest.fingerprint = await getVisitorId()
    // const url = getPortalPublicUrl() + '/comments'
    const url = '/comments'
    return await makePost(url, submitRequest) as PLInsertResult<PSCommentModel>
}

export async function fetchComments({resource}: { resource: string }) {
    const fingerprint = await getVisitorId()
    //const url = getPortalPublicUrl() + '/comments?resource=' + resource + '&fingerprint=' + fingerprint
    const url = '/comments?resource=' + resource + '&fingerprint=' + fingerprint
    return await makeGet<PLSelectResult<PSCommentModel>>(url)
}
