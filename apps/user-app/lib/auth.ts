
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
// check this for confirmation
import  db  from "@quickpay/db/client"



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
                const hashedPassword = await bcrypt.hash(credentials.password,10);
                console.log("Hashed password : -- "+hashedPassword);
                console.log(credentials.phone)
                const existingUser = await db.user.findFirst({
                    where : {
                        number : credentials.phone
                    }
                })
                console.log(credentials)
                if(existingUser){
                    console.log("Existing user : -- ",existingUser);
                    
                    const passowrdValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    console.log(passowrdValidation);
                    
                    if(passowrdValidation){
                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.email
                        }
                    }
                }
 
                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword,
                            
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        number: user.number
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