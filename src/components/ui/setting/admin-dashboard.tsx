import { Button } from "../shadcn-component/button"
import Link from "next/link"

export const AdminDashBoard = () => {
    return <div className="flex flex-col gap-3 m-2 p-2">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Link href="/admin/questions">
            <Button variant="secondary" className="w-full">Manage request (questions)</Button>
        </Link>
        <Link href="/admin/users">
            <Button variant="secondary" className="w-full">Manage users</Button>
        </Link>
        <Link href="/admin/rooms">
            <Button variant="secondary" className="w-full">Manage rooms</Button>
        </Link>
        <Button variant="outline" disabled>Manage reports</Button>
    </div>
}