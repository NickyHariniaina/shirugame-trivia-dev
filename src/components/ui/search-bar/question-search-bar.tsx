import { Button } from "../shadcn-component/button"
import { Input } from "../shadcn-component/input"

type QuestionSearchBarProps = {
    handleSearch: () => void
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const QuestionSearchBar = (props: QuestionSearchBarProps) => {
    return <div className="flex flex-row gap-2 items-center justify-center">
        <Input placeholder="Search Questions" value={props.searchValue} onChange={(e) => props.setSearchValue(e.target.value)} />
        <Button variant="default" onClick={props.handleSearch}>Search</Button>
    </div>
}
