import { QuestionsTable } from "@/components/ui/tables/question-table";

const Page = () => {
    return <div className="flex flex-col gap-4 m-4 p-3 justify-center items-center">
        <h2 className="text-2xl font-bold">Shirugame&apos;s questions</h2>
        <QuestionsTable />
    </div>
}

export default Page;