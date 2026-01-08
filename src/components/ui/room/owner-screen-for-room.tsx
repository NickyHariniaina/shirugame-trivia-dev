import { Question, Room } from "@/types/db";
import { CircleX, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../shadcn-component/carousel";
import { PlayerList } from "./player-list";
import { Button } from "../shadcn-component/button";
import { deleteRoomById } from "@/utils/func";
import toast from "react-hot-toast";
import { PartUnderConstruction } from "../chore-component/part-under-construction";

type OwnerScreenForRoomProps = {
  room: Room | undefined;
};

export const OwnerScreenForRoom = ({ room }: OwnerScreenForRoomProps) => {
  const router = useRouter();

  const handleCopyLink = async () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied successfully", { id: "copy-link" });
    } catch (error) {
      toast.error("Something went wrong, link not copied successfully.", {
        id: "copy-link",
      });
      console.log(error);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      const data = await deleteRoomById(room?.id || "");
      if (data.message) {
        toast.success(data.message, { id: "delete-room" });
        router.push("/room");
      }
    } catch (error) {
      toast.error("Something went wrong, room not deleted successfully.", {
        id: "delete-room",
      });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 mx-2 md:mx-1 w-full max-w-full rounded-lg shadow-md overflow-x-hidden">
      <h2 className="text-xl md:text-2xl font-bold">About your session</h2>

      <p className="text-sm md:text-base">
        <span className="font-semibold">Title:</span> {room?.title}
      </p>

      <p className="text-sm md:text-base">
        <span className="font-semibold">Owner:</span>{" "}
        <span
          className="underline cursor-pointer text-blue-600 dark:text-blue-400 break-all"
          onClick={() => router.push("/user/" + room?.openedBy.id)}
        >
          {room?.openedBy.username || room?.openedBy.email}
        </span>
      </p>

      <p className="text-sm md:text-base">
        <span className="font-semibold">Questions:</span>{" "}
        {room?.questions.length}
      </p>

      <p className="flex flex-row items-center gap-2 text-sm md:text-base">
        <span className="font-semibold">Status:</span>{" "}
        {room?.winner ? (
          <CircleX className="text-red-500" />
        ) : (
          <RefreshCw className="text-green-500 animate-spin" />
        )}
      </p>

      <p className="text-sm md:text-base break-all">
        <span className="font-semibold">Winner:</span>{" "}
        {room?.winner?.email || "No winner yet"}
      </p>

      {/* Carousel wrapper to prevent overflow */}
      <div className="w-full overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent className="w-full">
            <CarouselItem className="w-full">
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto overflow-x-hidden">
                <span className="font-semibold">List of players:</span>
                <PlayerList players={room?.players} />
              </div>
            </CarouselItem>
            <CarouselItem className="w-full">
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto overflow-x-hidden">
                <span className="font-semibold">Questions:</span>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto overflow-x-hidden">
                  {room?.questions.map((question: Question, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <p className="border-y py-2 w-[100%]">{question.question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="w-full">
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto overflow-x-hidden">
                <span className="font-semibold">Chat section</span>
                <PartUnderConstruction />
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Hide arrows on mobile to avoid overflow */}
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <Button
          className="flex-1"
          variant="secondary"
          onClick={handleCopyLink}
        >
          Copy link
        </Button>
        <Button
          className="flex-1"
          variant="destructive"
          onClick={handleDeleteRoom}
        >
          Close room
        </Button>
      </div>
    </div>
  );
};
