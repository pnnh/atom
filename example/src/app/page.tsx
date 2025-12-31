import {ClientComponent} from "./client";

export default async function Page({searchParams}: {
    searchParams: Promise<Record<string, string>>
}) {
    return <div>
        Hello, World!
        <ClientComponent/>
    </div>
}


