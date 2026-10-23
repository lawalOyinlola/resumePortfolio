import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import sharp from "sharp";
import VCard from "vcard-creator";

import { USER } from "@/features/profile/data/user";
import { decodeEmail, decodePhoneNumber } from "@/utils/string";

export const dynamic = "force-static";

export async function GET() {
  const card = new VCard();

  card
    .addName({ familyName: USER.lastName, givenName: USER.firstName })
    .addPhoneNumber({ number: decodePhoneNumber(USER.phoneNumber) })
    .addAddress({ locality: USER.address })
    .addEmail({ address: decodeEmail(USER.email) })
    .addUrl({ url: USER.website });

  const photo = await getVCardPhoto(USER.avatar);
  if (photo) {
    card.addPhoto({ image: photo, mime: "JPEG" });
  }

  if (USER.jobs.length > 0) {
    const company = USER.jobs[0];
    card.addCompany({ name: company.company }).addJobtitle(company.title);
  }

  return new NextResponse(card.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard",
      "Content-Disposition": `attachment; filename=${USER.username}-vcard.vcf`,
    },
  });
}

/**
 * Reads the avatar from `public/` and returns it as base64 JPEG. The avatar
 * path is site-relative, and a server-side `fetch` of a relative URL always
 * failed, so the card shipped without a photo.
 */
async function getVCardPhoto(avatarPath: string) {
  try {
    const filePath = path.join(process.cwd(), "public", avatarPath);
    const buffer = await readFile(filePath);
    if (buffer.length === 0) {
      return null;
    }

    const jpegBuffer = await convertImageToJpeg(buffer);
    return jpegBuffer.toString("base64");
  } catch {
    return null;
  }
}

async function convertImageToJpeg(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const jpegBuffer = await sharp(imageBuffer)
      .jpeg({
        quality: 90,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer();

    return jpegBuffer;
  } catch (error) {
    console.error("Error converting image to JPEG:", error);
    throw error;
  }
}
