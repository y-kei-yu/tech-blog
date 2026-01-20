import { useState } from "react"

export default function Pagination() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    /** todo: ページネーションのロジックを実装する
    前ボタンを押したら currentPage をデクリメント
    次ボタンを押したら currentPage をインクリメント
    次ボタンを押したらAPIが呼ばれる


    */
    return (
        <div className="w-full flex justify-center my-6">
            <button className="btn">前へ</button>
            <button className="btn ml-4">次へ</button>
        </div>
    )
}