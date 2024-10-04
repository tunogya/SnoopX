"use client";
import { useParams } from "next/navigation";

const Page = () => {

    const { id } = useParams();
    return (
        <div>
            <h1>Event</h1>
            <div>{id}</div>
        </div>
    )
}

export default Page;