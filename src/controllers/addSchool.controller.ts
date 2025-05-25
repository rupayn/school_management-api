import express from "express";
import { asyncHandler, CustomError, CustomSuccessResponse } from "../utils";
import { PrismaClientInstance } from "../utils/db";
import { z } from "zod";

const addSchoolSchema = z.object({
    name: z.string().min(5, "Name is required").max(300),
    address: z.string().min(1, "Address is required"),
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
});

export const addSchoolController = asyncHandler(
    async (req: express.Request, res: express.Response) => {
        const parsed = addSchoolSchema.safeParse(req.body);
        if (!parsed.success) {
            const errorDetails = parsed.error.errors.map((err) => ({
                message: err.message,
                path: err.path.join("."), // optional, for clarity
            }));
            throw new CustomError(
                400,
                parsed.error.errors[0].message,
                errorDetails,
            );
        }

        const existingSchool = await PrismaClientInstance.schools.findFirst({
            where: {
                latitude: parsed.data.latitude,
                longitude: parsed.data.longitude,
            },
        });

        if (existingSchool) {
            throw new CustomError(
                400,
                "School already exists at this location",
            );
        }
        const { name, address, latitude, longitude } = parsed.data;

        const createdSchool = await PrismaClientInstance.schools.create({
            data: {
                name,
                address,
                latitude,
                longitude,
            },
        });

        return res
            .status(200)
            .json(
                new CustomSuccessResponse(
                    200,
                    createdSchool,
                    "School added successfully",
                ),
            );
    },
);
