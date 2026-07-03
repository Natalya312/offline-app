// src/services/p2p.js

import QRCode from "qrcode";

/**
 * Build a compact payload string from user profile data.
 * This string will be encoded into a QR code.
 */
export function buildProfilePayload(profile) {
  const payload = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    interest: profile.interest,
    age: profile.age,
    gender: profile.gender,
    meetingTime: profile.meetingTime,
    meetingDate: profile.meetingDate,
    distance: profile.distance,
  };

  return JSON.stringify(payload);
}

/**
 * Parse and validate a profile payload string read from a QR code.
 */
export function parseProfilePayload(payloadString) {
  try {
    const data = JSON.parse(payloadString);

    if (!data.id || !data.name) {
      throw new Error("Invalid profile payload");
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email || "",
      interest: data.interest || "",
      age: data.age || "",
      gender: data.gender || "",
      meetingTime: data.meetingTime || "",
      meetingDate: data.meetingDate || "",
      distance: data.distance || "",
    };
  } catch (error) {
    console.error("Failed to parse profile payload:", error);
    return null;
  }
}

/**
 * Generate a QR code data URL from a profile object.
 * This data URL can be used as the src of an <img> tag.
 */
export async function generateProfileQrCode(profile) {
  const payload = buildProfilePayload(profile);

  try {
    const dataUrl = await QRCode.toDataURL(payload, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 256,
    });

    return dataUrl;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    return null;
  }
}
