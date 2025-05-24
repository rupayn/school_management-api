import express from "express";

interface functionInterface {
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response>;
}

export const asyncHandler = function (functionHandler: functionInterface) {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {
            await functionHandler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
