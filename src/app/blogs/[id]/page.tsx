import BlogDetail from '@/app/components/BlogDetail'
import { fetchMicroCMSBlogDetail } from '@/contact'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

export default async function Page({ params }: Props) {

    const resoledParam = Promise.resolve(params);
    const id = (await resoledParam).id;

    const article = await fetchMicroCMSBlogDetail(id);

    return (
        <div className="w-full flex flex-col px-3 my-6">
            <div className="flex justify-between">

            </div>
        </div>)
}
