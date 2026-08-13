import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image uploaded." },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Only JPG, PNG, and WEBP images are allowed.",
        },
        { status: 400 }
      );
    }

    // Check file size - 5 MB maximum
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "Image must be smaller than 5 MB.",
        },
        { status: 400 }
      );
    }

    /*
     * Temporary local-data approach.
     *
     * This converts the image into a data URL and stores it
     * in User.image.
     *
     * Later, before production, we should move this to
     * Cloudinary or another object-storage service.
     */
    const bytes = await file.arrayBuffer();

    const base64 = Buffer.from(bytes).toString("base64");

    const imageUrl = `data:${file.type};base64,${base64}`;

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image: imageUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile Image Upload Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to upload profile image.",
      },
      { status: 500 }
    );
  }
}