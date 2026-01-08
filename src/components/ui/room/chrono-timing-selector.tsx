import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn-component/select";

type ChronoTimingSelectorProps = {
  setChronoTiming: (value: number) => void;
  chronoTiming: number;
};

export const ChronoTimingSelector = ({ setChronoTiming, chronoTiming }: ChronoTimingSelectorProps) => {
  const handleChange = (value: string) => {
    setChronoTiming(parseInt(value));
  }

  return <Select value={chronoTiming.toString()} onValueChange={handleChange}>
    <SelectTrigger className="">
      <SelectValue placeholder="Chrono" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="10">10s</SelectItem>
      <SelectItem value="15">15s</SelectItem>
      <SelectItem value="20">20s</SelectItem>
      <SelectItem value="25">25s</SelectItem>
      <SelectItem value="30">30s</SelectItem>
    </SelectContent>
  </Select>
}
