
import { BlogDetail } from '@/types/BlogDetail'
import Image from 'next/image'
import React from 'react'

type BlogDetailViewProps = {
    microCMSBlogDetail: BlogDetail
}

export default function BlogDetailView({ microCMSBlogDetail }: BlogDetailViewProps) {
    return (
        <div className="max-w-3xl mx-auto">
            <Image className="mb-4 text-gray-500" src={microCMSBlogDetail.thumbnail.url} width={600} height={400} alt={microCMSBlogDetail.title} />
            <div className="text-2xl font-bold mb-4">{microCMSBlogDetail.title}</div>
            <div className="mb-4">{microCMSBlogDetail.description}</div>
            <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: microCMSBlogDetail.content }}></div>
            <div className="mt-6 text-sm text-gray-500">
                <p>作成日: {microCMSBlogDetail.createdAt}</p>
                <p>公開日: {microCMSBlogDetail.publishedAt}</p>
            </div>
        </div>
    )
}
