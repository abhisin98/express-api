import express from "express"
let router = express.Router();

//---------------------------------------------------------------------------
// router.use('/users', usersRouter);

//---------------------------------------------------------------------------
// router.use(function (req, res, next) {
//     res._json = res.json;
//     res.json = function json(obj) {
//         obj.apiVersion = 2;
//         res._json(obj);
//     };
//     next();
// });
router.get("/", (req, res) => {
    const status = {
        "info": "Welcome to api version 2",
        "Status": "Running 2",
    };
    res.send(status);
});

//---------------------------------------------------------------------------
export default router;