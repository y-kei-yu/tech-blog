import Link from "next/link";


export default function Page() {
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <h1 className=" text-red-500 text-3xl font-bold underline">
        Hello world!
        Hello Japan!
      </h1>
      <button className="btn btn-info">Info</button>
    </>
  );
}
