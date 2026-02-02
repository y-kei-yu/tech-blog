import { Article } from '@/types/Article'
import React from 'react'

export default function BlogDetail({ microCMSBlogDetail }: { microCMSBlogDetail: Article }) {
    return (
        <div>{microCMSBlogDetail.title}</div>
    )
}
