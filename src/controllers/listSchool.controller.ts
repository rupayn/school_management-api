import { asyncHandler, CustomError, CustomSuccessResponse } from "../utils";
import express from "express";
import { z } from "zod";
import { PrismaClientInstance } from "../utils/db";

//Zod validation
const querySchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
});

/* 
    Function for calculating distance between Users and Schools.
    Here  to calculate distance i used Haversine Formula
*/
const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
) => {
    const R = 6371; // Radius of the earth in km
    const toRad = (deg: number) => (deg * Math.PI) / 180; // The function toRad is used to convert degrees to radians,

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
};

export const listSchoolController = asyncHandler(
    async (req: express.Request, res: express.Response) => {
        const data = req.query;

        if (!data.latitude && !data.longitude) {
            throw new CustomError(
                400,
                "Invalid latitude or longitude is provided",
            );
        }

        const filteredQuery = querySchema.safeParse(req.query);

        if (!filteredQuery.success) {
            throw new CustomError(
                400,
                "Invalid latitude or longitude is provided",
            );
        }
        const { latitude, longitude } = filteredQuery.data;
        const schools = await PrismaClientInstance.schools.findMany();
        const sortedSchool = schools
            .map((school) => ({
                ...school,
                distance: calculateDistance(
                    latitude,
                    longitude,
                    school.latitude,
                    school.longitude,
                ),
            }))
            .sort((a, b) => a.distance - b.distance);
        return res
            .status(200)
            .json(new CustomSuccessResponse(200, sortedSchool));
    },
);
