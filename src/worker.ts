import { httpServerHandler } from "cloudflare:node";

import { server, PORT } from "./server";

//---------------------------------------------------------------------------
console.log("Listening:", server.listening);

//---------------------------------------------------------------------------
// Export the server as a Workers handler
export default httpServerHandler({ port: Number(PORT) });
// Or you can simply pass the http.Server instance directly:
// export default httpServerHandler(server);
