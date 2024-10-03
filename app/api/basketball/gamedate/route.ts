import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    24: [
      "09/21/2024",
      "10/12/2024",
      "10/26/2024",
      "11/09/2024",
      "12/01/2024",
      "12/07/2024",
    ],
    25: [
      "09/21/2024",
      "10/12/2024",
      "10/26/2024",
      "11/09/2024",
      "12/01/2024",
      "12/07/2024",
    ],
  };
  return NextResponse.json({ data });
}
