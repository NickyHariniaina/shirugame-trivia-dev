import { User } from "@/types/db";
import { Avatar } from "../Avatar";
import {  TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../table";

type UserTablePropsType = {
  users: User[];
};

export const UserTable = ({ users }: UserTablePropsType) => {
  return (
    <div className="shadow-2xl dark:shadow-blue-700 max-w-full overflow-x-hidden border rounded-lg">
      <Table className="min-w-[400px] md:min-w-[600px] lg:min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%] text-left">Rank</TableHead>
            <TableHead className="text-left w-[20%]">Username</TableHead>
            <TableHead className="text-left w-[10%]">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.rank}</TableCell>
              <TableCell className="flex flex-row gap-2 items-center"><Avatar src={user.image || ""} alt={user.username || ""} size={20} /><span className="text-sm">{user.username}</span></TableCell>
              <TableCell>{user.highestScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
