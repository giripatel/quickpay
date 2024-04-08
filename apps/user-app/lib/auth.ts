
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import  {PrismaClient}  from "@quickpay/db/client"

const client = new PrismaClient();


export const authOptions = {

    providers :[
        CredentialsProvider ({
            name : "Credentials",
            credentials : {
                phone : {label : "Phone Number",type : "text", palceholder : "9876543210"},
                password : {label : "Password", type : "password", placeholder : "**********"}               
            },
            // TODO : User crendentials type
            async authorize(credentials : any){
                
                const hashedPassword = await bcrypt.hash(credentials.passowrd,"password")
                const existingUser = await client.user.findFirst({
                    where : {
                        number : credentials.number
                    }
                })

                if(existingUser){
                    
                    const passowrdValidation = await bcrypt.compare(credentials.passowrd, existingUser.password);
                    if(passowrdValidation){

                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.email
                        }
                    }

                }
 
                try {
                    const user = await client.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch(e) {
                    console.error(e);
                }
    
                return null
            }
        })
    ],
    
    secret : process.env.JWT_SECRET || "secret",
    callbacks : {

        // TODO : remove any and use the exact types
         async session({token, session} : any)  {
            session.user.id = token.sub
            console.log("Reacing this part")
            return session
        }
    }
}