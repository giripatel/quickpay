import { PrismaClient } from "@quickpay/db/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export  async function GET() {

  const user = prisma.user.create({
    data : {
      email : "hello",
      password : "secret passowrd"
    }
  })

  return NextResponse.json(
    {message : "hi there"}
  )
}