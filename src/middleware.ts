import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

export async function middleware({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) {
  const cookies = req?.cookies;
  const response = NextResponse.next();

  //   If the user already has an refresh token, continue transaction. (return response)
  if (cookies?.get("refreshToken")) {
    return response;
  }

  //   If the user doesn't have an refresh token, create a new client
  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
  const tokens = await wixClient.auth.generateVisitorTokens();
  response.cookies.set("visitorToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
