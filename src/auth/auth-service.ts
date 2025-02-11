import { Request, Response, NextFunction } from "express";

const AUTH_COOKIE = "rire-user";

// Middleware to check auth and send form dynamically if needed
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies[AUTH_COOKIE]) {
        if (req.headers["hx-request"]) {
            return res.send(getLoginForm(req.originalUrl)); // Send form if HTMX request
        } else {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
                </head>
                <body>
                    <div id="main-content">
                        ${getLoginForm(req.originalUrl)}
                    </div>
                </body>
                </html>
            `);
        }
    }
    next();
};

export function login(token: string, res: Response) {
        // Simulate storing the token (here using a cookie)
        res.cookie(AUTH_COOKIE, token, { httpOnly: true });
}
// Login form generator
const getLoginForm = (returnUrl: string) => `
    <div id="login-modal">
        <form hx-post="/submit-form" hx-target="#main-content" hx-swap="outerHTML">
            <input type="hidden" name="returnUrl" value="${returnUrl}" />
            <label>dein Name: <input type="text" name="name" required /></label>
            <button type="submit">Submit</button>
        </form>
        
    </div>
`;

export function logout(res: Response) {
        // Simulate storing the token (here using a cookie)
        res.clearCookie(AUTH_COOKIE);
}

export default checkAuth;

