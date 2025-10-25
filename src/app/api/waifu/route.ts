import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await fetch("https://api.nekosapi.com/v4/images/random");
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
};
