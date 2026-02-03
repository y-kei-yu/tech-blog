
import { BlogDetail } from '@/types/BlogDetail'
import React from 'react'

type BlogDetailViewProps = {
    microCMSBlogDetail: BlogDetail
}

export default function BlogDetailView({ microCMSBlogDetail }: BlogDetailViewProps) {
    return (
        <div>{microCMSBlogDetail.title}</div>
    )
}
