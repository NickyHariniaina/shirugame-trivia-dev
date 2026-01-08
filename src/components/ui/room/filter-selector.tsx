import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-component/select";

type FilterSelectorProps = {
  setTypeId: (value: string) => void;
  typeId: string;
};

export const FilterSelector = ({ setTypeId, typeId }: FilterSelectorProps) => {
  return (
    <Select value={typeId} onValueChange={setTypeId}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="null">All</SelectItem>
        <SelectItem value="t-ai">Artificial Intelligence</SelectItem>
        <SelectItem value="t-algo">Algorithms</SelectItem>
        <SelectItem value="t-db">Databases</SelectItem>
        <SelectItem value="t-ds">Data Structures</SelectItem>
        <SelectItem value="t-misc">Miscellaneous</SelectItem>
        <SelectItem value="t-net">Computer Networks</SelectItem>
        <SelectItem value="t-os">Operating Systems</SelectItem>
        <SelectItem value="t-prog">Programming Languages</SelectItem>
        <SelectItem value="t-se">Software Engineering</SelectItem>
        <SelectItem value="t-sec">Cybersecurity</SelectItem>
        <SelectItem value="t-theory">Theory of Computation</SelectItem>
        <SelectItem value="t-web">Web Development</SelectItem>
      </SelectContent>
    </Select>
  );
};
