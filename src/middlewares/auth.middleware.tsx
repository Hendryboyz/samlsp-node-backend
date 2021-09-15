import { Request, Response, NextFunction } from 'express';

export function IsAuthenticatedSession(
    request: any,
    response: Response,
    next: NextFunction
) {
    if (request.isAuthenticated()) {
        next();
    }
    else {
        response.redirect('/auth/entrypoint');
    }
}