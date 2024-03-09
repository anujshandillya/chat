'use server'

import { revalidatePath } from "next/cache"

import { Connect } from "../database"
import User from "../database/models/user.model"
import { handleError } from "../utils"

import { CreateUser, UpdateUser } from "@/types"
import Chat from "../database/models/chat.model"

export const createUser = async(user: CreateUser) => {
    try {
        await Connect()
        const newUser=await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

export const updateUser = async(ClerkId: string, user: UpdateUser) => {
    try {
        await Connect()

        const updatedUser = await User.findOneAndUpdate({ ClerkId }, user, {new: true})

        if(!updatedUser) throw new Error("User could not be updated...")
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }
}

export const deleteUser = async(ClerkId: string) => {
    try {
        const deletedUser = await User.findOne({ClerkId})

        if(!deletedUser) throw new Error("User not found...")

        const x = await User.findByIdAndDelete(deletedUser._id)
        revalidatePath('/')
        return x ? JSON.parse(JSON.stringify(x)) : null
    } catch (error) {
        handleError(error)
    }
}