import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../shadcn-component/table";
export const Resume = ({ myAnswers, theAnswers, questions }: { myAnswers: string[], theAnswers: string[], questions: string[] }) => {
  return (
    <Table>
      <TableCaption>Here you can compare your answers with the correct answers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Questions</TableHead>
          <TableHead>Your answers</TableHead>
          <TableHead>Correct answers</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question, index) => (
          <TableRow key={index}>
            <TableCell>{question}</TableCell>
            <TableCell>{myAnswers[index]}</TableCell>
            <TableCell>{theAnswers[index]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
