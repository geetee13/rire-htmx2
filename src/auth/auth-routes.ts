import express, { Request, Response, NextFunction } from "express";

const AUTH_COOKIE = "rire-user";
const router = express.Router();

// Middleware to check auth and send form dynamically if needed
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
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

// Protected page
router.get("/protected", checkAuth, (req: Request, res: Response) => {
    res.send(`
        <h1>Welcome to the Protected Page! ${req.cookies[AUTH_COOKIE]}</h1>
        <p>You have successfully authenticated.</p>
        <h1></h1>
        <button hx-post="/de-auth" hx-swap="innerHTML">Logout</button>
    `);
});

// Login form generator
const getLoginForm = (returnUrl: string) => `
    <div id="login-modal">
        <form hx-post="/submit-form" hx-target="#main-content" hx-swap="outerHTML">
            <input type="hidden" name="returnUrl" value="${returnUrl}" />
            <label>dein Name: <input type="text" name="token" required /></label>
            <button type="submit">Submit</button>
        </form>
        
    </div>
`;

// Handle login submission
router.post("/submit-form", (req: Request, res: Response) => {
    const { token, returnUrl } = req.body;

    // Simulate storing the token (here using a cookie)
    res.cookie(AUTH_COOKIE, token, { httpOnly: true });

    // If it's an HTMX request, use HX-Redirect
    if (req.headers["hx-request"]) {
        res.set("HX-Redirect", returnUrl);
        res.end();
    } else {
        res.redirect(returnUrl);
    }
});

// Handle login submission
router.post("/de-auth", (req: Request, res: Response) => {
    const { token, returnUrl } = req.body;

    // Simulate storing the token (here using a cookie)
    res.clearCookie(AUTH_COOKIE);

    // If it's an HTMX request, use HX-Redirect
    if (req.headers["hx-request"]) {
        res.set("HX-Redirect", "/logout");
        //res.setHeader("HX-Location", JSON.stringify({ path: "/logout" }));
        res.end();
    } else {
        res.redirect("/logout");
    }
});

router.get("/logout", (req: Request, res: Response) => {
    res.send(`
        <h1>Welcome to the Not Protected Page! </h1>
        <p>You have successfully logged out.</p>
        <h1></h1>
        <button hx-get="/protected" hx-swap="innerHTML">Login</button>
    `);
});

export default router;
