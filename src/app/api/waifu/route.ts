import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch("https://api.nekosapi.com/v4/images/random");
  const data = await res.json();
  return NextResponse.json(data);
}
