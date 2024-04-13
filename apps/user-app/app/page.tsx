import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import { Appbar } from "@repo/ui/Appbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


export default async function Page() {
  
  const session = await getServerSession( authOptions );

  if(session?.user){
    redirect('/dashboard')
  }else{
    redirect('/api/auth/signin')
  }

}
