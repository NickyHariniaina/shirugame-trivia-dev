import { Input } from "../input"

export const RoomCreationBodyCard = () => {
  return <div className='flex flex-col gap-4'>
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Input placeholder='Choose a title for your room' type='text'/>
        <Input placeholder='Choose a description for your room' type='text'/>
        <Input type='date'/>
      </div>
    </div>
  </div>
}
