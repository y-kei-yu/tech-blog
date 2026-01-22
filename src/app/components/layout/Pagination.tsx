"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react"

export default function Pagination() {

    const searchParams = useSearchParams();
    let pageParam = searchParams.get("page");

    if (!pageParam) {
        pageParam = "1";
    } else {
        pageParam = Number(pageParam).toString();
    }
    const initPage = pageParam ? parseInt(pageParam) : 1;

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="w-full flex justify-center my-6">
            <button className="btn">前へ</button>
            <button className="btn ml-4">次へ</button>
        </div>
    )
}