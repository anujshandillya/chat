import { Webhook, WebhookRequiredHeaders } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse, NextRequest } from 'next/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { IncomingHttpHeaders } from 'http'

const SECRET = process.env.WS

export async function POST(req: Request) {
    
    if(!SECRET) throw new Error("WS empty...")
    const headerPayload = headers();

    const head = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature")
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(SECRET)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body,head as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent
    } catch (error) {
        console.error(error as Error)
        return new Response('Error encountered', {
            status: 400
        })
    }

    const evtType = evt.type;

    if(evtType === "user.created") {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

        const user = {
            ClerkId: id,
            firstname: first_name,
            lastname: last_name,
            email: email_addresses[0].email_address,
            username: username!,
            img: image_url
        }

        const newUser = await createUser(user);
        if(newUser) {
            await clerkClient.users.updateUserMetadata(id, {
                publicMetadata: {
                    userId: newUser._id
                }
            })
        }

        return NextResponse.json({message: "OK", user: newUser})
    }

    if(evtType === "user.updated") {
        const { id, image_url, first_name, last_name, username } = evt.data;

        const user = {
            firstname: first_name,
            lastname: last_name,
            username: username!,
            img: image_url
        }

        const newUser = await updateUser(id,user);
        if(newUser) {
            await clerkClient.users.updateUserMetadata(id, {
                publicMetadata: {
                    userId: newUser._id
                }
            })
        }

        return NextResponse.json({message: "OK", user: newUser})
    }

    if(evtType === "user.deleted") {
        const { id } = evt.data;

        const deletedUser = await deleteUser(id!)

        return NextResponse.json({message: "OK", user:deletedUser})
    }

    return new Response('', {status: 200})
}

export async function GET(){
    const data = {
        name: 'Bishal Shrestha',
        age: '27'
    }

    return NextResponse.json(data)
}