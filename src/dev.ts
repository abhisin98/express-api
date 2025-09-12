import { server } from "./server";

//---------------------------------------------------------------------------
console.log("Listening:", server.listening);

//---------------------------------------------------------------------------
declare const module: any;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    server.close();
    console.log("Server will close");
  });
}
