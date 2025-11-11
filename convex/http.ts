import { httpRouter } from "convex/server";
import { auth } from "./auth";

/**
 * HTTP Router Configuration
 *
 * This file sets up HTTP routes for the Convex backend.
 * The /auth route handles all authentication operations.
 */

const http = httpRouter();

// Register auth HTTP actions at /auth
auth.addHttpRoutes(http);

export default http;
