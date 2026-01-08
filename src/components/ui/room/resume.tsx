import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../shadcn-component/table";
export const Resume = ({ myAnswers, theAnswers }: { myAnswers: string[], theAnswers: string[] }) => {
  return (
    <Table>
      <TableCaption>Here you can compare your answers with the correct answers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Your answers</TableHead>
          <TableHead>Correct answers</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {myAnswers.map((answer, index) => (
          <TableRow key={index}>
            <TableCell>{answer}</TableCell>
            <TableCell>{theAnswers[index]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
