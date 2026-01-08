import { RoomCreationBodyCard } from "./room-creation-body-card";
export const RoomCreationBody = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className='text-2xl my-5'>Create a room</h2>
      <div className="flex flex-col gap-4">
        <RoomCreationBodyCard />
      </div>
    </div>
  );
};
