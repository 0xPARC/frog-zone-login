import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/init";

export async function POST(request: Request) {
  try {
    const { machineId, publicKey } = await request.json();

    if (!machineId || !publicKey) {
      return NextResponse.json(
        {
          success: false,
          message: "machineId and publicKey are required.",
        },
        { status: 400 },
      );
    }

    // Upsert operation: update if exists, create if not
    const upsertedMachine = await prisma.machine.upsert({
      where: { machineId },
      update: { publicKey },
      create: { machineId, publicKey },
    });

    return NextResponse.json({
      success: true,
      message: "Data saved successfully",
      machine: upsertedMachine,
    });
  } catch (error) {
    console.error("Error saving to database:", error);

    return NextResponse.json(
      { success: false, message: "Failed to save data" },
      { status: 500 },
    );
  }
}
