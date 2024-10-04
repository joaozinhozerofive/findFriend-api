import { orgRefreshTokenController } from "@/http/controllers/orgs/org-refresh-token-controller";
import { orgRegisterController } from "@/http/controllers/orgs/org-register-controller";
import { orgSessionController } from "@/http/controllers/orgs/org-session-controller";
import { orgUpdateController } from "@/http/controllers/orgs/org-update-controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function orgRoutes(app : FastifyInstance) {
    app.post('/org/register',                               orgRegisterController);
    app.put('/org/update',        {onRequest: [verifyJwt]}, orgUpdateController);
    app.post('/org/session',                                orgSessionController);
    app.post('/org/refreshToken', {onRequest: [verifyJwt]}, orgRefreshTokenController);
}