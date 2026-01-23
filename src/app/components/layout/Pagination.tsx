"use client";

import Link from "next/link";

type Props = {
    currentPage: number;
    hasNextPage: boolean;
};

export default function Pagination({ currentPage, hasNextPage }: Props) {
    const prePage = currentPage - 1;
    const nextPage = currentPage + 1;

    const isPreDisabled = currentPage <= 1;


    return (
        <div className="w-full flex justify-center my-6">
            {/* 前へ */}
            {isPreDisabled ? (
                <button className="btn btn-disabled">前へ</button>
            ) : (
                <Link href={`/individuals?page=${prePage}`} className="btn">前へ</Link>
            )}
            {/* 次へ */}
            {hasNextPage ? (
                <Link href={`/individuals?page=${nextPage}`} className="btn ml-4">次へ</Link>
            ) : (
                <button className="btn btn-disabled ml-4">次へ</button>
            )}
        </div>
    )
}