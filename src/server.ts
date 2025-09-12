import cors, { CorsOptions } from "cors";
import express from "express";
import morgan from "morgan";
import http from "node:http";

import apiv1 from "./v1";
import apiv2 from "./v2";

// --------------------------------------------------------------------
const app = express();
const server = http.createServer(app);

//---------------------------------------------------------------------------
const PORT = process.env.PORT || 4000;

// You may add core option here
const corsOptions: CorsOptions = {
  // enabling CORS for some specific origins only.
  origin: [],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["content-type"], // Allow specific headers
  credentials: true,
};

// Apply core Middleware before all routers and middleware
app.use(cors(corsOptions));
app.use(morgan("tiny"));

// --------------------------------------------------------------------
// You may add app specific api router here.
// Now mount the API routers
app.use("/api/v1", apiv1);
app.use("/api/v2", apiv2);
app.get("/api/status", (req, res) => {
  res.status(200).json({ status: true, info: "API is running" });
});

// --------------------------------------------------------------------
// You may add application-specific API middleware here, after all routes have been processed.
// ...

//---------------------------------------------------------------------------
server.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

export { server, PORT };
