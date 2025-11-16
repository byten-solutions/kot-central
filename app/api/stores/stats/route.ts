import { NextResponse } from "next/server";

export async function GET() {
  try {
    // TODO: Calculate from database
    const stats = {
      totalStores: 3,
      activeStores: 2,
      totalOrders: 2590,
      todayOrders: 77,
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
