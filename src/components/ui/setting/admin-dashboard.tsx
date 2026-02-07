import { Button } from "../shadcn-component/button"

export const AdminDashBoard = () => {
    return <div className="flex flex-col gap-3 m-2 p-2">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Button variant="secondary">Manage request (questions)</Button>
        <Button variant="secondary">Manage users</Button>
        <Button variant="secondary">Manage rooms</Button>
        <Button variant="outline">Manage reports</Button>
    </div>
}