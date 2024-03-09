import { string } from "prop-types"

export type CreateUser = {
    ClerkId: string
    firstname: string
    lastname: string
    email: string
    username: string
    img: string
}

export type UpdateUser = {
    username: string
    firstname: string
    lastname: string
    img: string
}