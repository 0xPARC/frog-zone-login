import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/init";

export async function GET(
  request: Request,
  { params }: { params: { machineId: string } },
) {
  const { machineId } = params;

  try {
    const machine = await prisma.machine.findUnique({
      where: { machineId },
    });

    if (machine) {
      return NextResponse.json({
        success: true,
        message: "Machine found",
        isLoggedIn: Boolean(machine.publicKey),
        machine,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "Machine not found",
        isLoggedIn: false,
        machine: null,
      });
    }
  } catch (error) {
    console.error("Error checking machineId:", error);
    return NextResponse.json(
      { success: false, message: "Failed to check machineId" },
      { status: 500 },
    );
  }
}
