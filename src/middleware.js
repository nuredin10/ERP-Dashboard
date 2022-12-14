import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = "PROPLAST";
const baseUrl = "http://localhost:3000/";

export default async function middleware(req) {
  const { cookies } = req;

  const jwt = await cookies.get("token");

  const url = req.url;

  if(url === baseUrl){
      if(jwt){
          try{
              await jwtVerify(jwt, new TextEncoder().encode(secret));
              return NextResponse.redirect(`${baseUrl}dashboard`)
          } catch(e){
              console.log(e);
              return NextResponse.next();
          }
      }
  }

  if (url === `${baseUrl}dashboard`) {
    if (jwt === undefined) {
      return NextResponse.redirect(baseUrl);
    }
    // console.log(url)

    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(baseUrl);
    }
  }
  return NextResponse.next();
}
