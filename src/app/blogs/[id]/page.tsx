import BlogDetailView from '@/app/components/BlogDetailView'
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

    const BlogArticle = await fetchMicroCMSBlogDetail(id);

    return (
        <div className="w-full flex flex-col px-3 my-6">
            <div className="flex justify-between">
                <BlogDetailView microCMSBlogDetail={BlogArticle} />
            </div>
        </div>)
}
