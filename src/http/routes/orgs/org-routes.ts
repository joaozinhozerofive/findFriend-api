import { orgRefreshTokenController } from "@/http/controllers/orgs/org-refresh-token";
import { orgRegisterController } from "@/http/controllers/orgs/org-register";
import { orgSessionController } from "@/http/controllers/orgs/org-session";
import { orgUpdateController } from "@/http/controllers/orgs/org-update";
import { FastifyInstance } from "fastify";

export async function orgRoutes(app : FastifyInstance) {
    app.post('/org/register',      orgRegisterController);
    app.put('/org/update',         orgUpdateController);
    app.post('/org/session',       orgSessionController);
    app.post('/org/refreshToken',  orgRefreshTokenController);
}