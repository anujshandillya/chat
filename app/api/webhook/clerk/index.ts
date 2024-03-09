import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'

export const POST = async (req: Request) => {
    const SECRET = process.env.WS
    if(!SECRET) throw new Error("WS empty...")

    const headerPayload = headers();
    const svix_id=headerPayload.get("svix-id");
    const svix_timestamp=headerPayload.get("svix-timestamp");
    const svix_signature=headerPayload.get("svix-signature");

    if(!svix_id || !svix_signature || !svix_timestamp) {
        return new Response('Error encountered - no svix header', {
            status: 400
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(SECRET)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
          }) as WebhookEvent
    } catch (error) {
        console.log(error)
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