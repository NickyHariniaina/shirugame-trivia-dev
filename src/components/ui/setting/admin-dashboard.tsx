import { Button } from "../shadcn-component/button"
import Link from "next/link"

export const AdminDashBoard = () => {
    return <div className="flex flex-col gap-3 m-2 p-2">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Link href="/admin/questions">
            <Button variant="secondary" className="w-full">Manage request (questions)</Button>
        </Link>
        <Button variant="secondary" disabled>Manage users</Button>
        <Button variant="secondary" disabled>Manage rooms</Button>
        <Button variant="outline" disabled>Manage reports</Button>
    </div>
}