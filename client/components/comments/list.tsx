import './list.scss'
import {useEffect, useState} from "react";
import {PLSelectResult} from "@/atom/common/models/protocol";
import {PSCommentModel} from "@/atom/common/models/comment";
import {fetchComments} from "@/atom/client/comments/comment";

export function ListArea({portalUrl, resource}: { portalUrl: string, resource: string }) {
    const [list, setList] = useState<PLSelectResult<PSCommentModel>>()
    useEffect(() => {
        fetchComments({portalUrl, resource}).then(result => {
            setList(result)
        })
    }, [])
    if (!list) {
        return <div>Loading...</div>
    }
    if (!list.data || list.data.count === 0 || !list.data.range) {
        return <div>
            暂无评论
        </div>
    }
    return <div className={'listContainer'}>
        <div>
            {
                list.data.range.map((comment, index) => {
                    return <div key={index} className={'commentItem'}>
                        <div className={'commentHeader'}>
                            <div className={'commentAuthor'}>{comment.nickname || '匿名'}</div>
                            <div className={'commentTime'}>{comment.create_time}</div>
                        </div>
                        <div className={'commentContent'}>{comment.content}</div>
                    </div>
                })
            }

        </div>
    </div>
}
