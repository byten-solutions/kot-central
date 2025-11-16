import { NextRequest, NextResponse } from "next/server";

// Mock data - replace with database calls
const mockStores = [
  {
    id: "1",
    name: "Downtown Branch",
    location: "123 Main St, Downtown",
    status: "active",
    ordersToday: 45,
    totalOrders: 1250,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Westside Location",
    location: "456 West Ave, Westside",
    status: "active",
    ordersToday: 32,
    totalOrders: 890,
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "East Mall Store",
    location: "789 East Blvd, Mall",
    status: "inactive",
    ordersToday: 0,
    totalOrders: 450,
    createdAt: "2024-03-10",
  },
];

export async function GET() {
  try {
    // TODO: Fetch from database
    return NextResponse.json(mockStores);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // TODO: Save to database
    const newStore = {
      id: String(mockStores.length + 1),
      ...data,
      ordersToday: 0,
      totalOrders: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create store" },
      { status: 500 }
    );
  }
}
