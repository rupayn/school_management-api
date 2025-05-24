import { asyncHandler, CustomError, CustomSuccessResponse } from "../utils";
import express from "express";
import {z} from 'zod'
const querySchema=z.object({
    latitude:z.coerce.number().min(-90).max(90),
    longitude:z.coerce.number().min(-180).max(180),
})


export const listSchoolController= asyncHandler(async (req:express.Request, res:express.Response) => {
    const {latitude ,longitude}=req.query
    const filteredQuery=querySchema.safeParse({latitude,longitude})
    if (!filteredQuery.success) {
        throw new CustomError(400, "Invalid latitude or longitude is provided")
    }
    return res.status(200).json(
        new CustomSuccessResponse(200,{latitude,longitude})
    )
});