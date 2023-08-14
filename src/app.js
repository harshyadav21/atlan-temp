const express = require("express");
require("./db/conn");

const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const studentRouter = require("./routers/student");
const router = new express.Router();
const routerTranlate = require("./routers/translate");
const hbs = require("hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // due to html frontend code else no need of this line

// app.post("/students", (req, res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     });

// })



const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
//app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/", (req, res) => {
    res.render("index");
});



// app.post("/students", async(req, res) => {

//     try {

//         const { income, savings } = req.body;
//         if (income < savings) {
//             return res.status(500).send({
//                 status: "Failed",
//                 issue: "Client Income-savings Validation failed!",
//                 message: "Client monthly Savings Exceeds Client Monthly Income!",
//             });

//         }
//         const user = new Employee(req.body
//             //{
//             // name: req.body.name,
//             // email: req.body.email,
//             // phone: req.body.phone,
//             // address: req.body.address,
//             // income: req.body.income,
//             // saings: req.body.savings
//             //}
//         );
//         console.log(typeof req.body);
//         console.log(req.body.name);

//         createUser = await user.save();
//         console.log(typeof createUser);
//         // const sheets = await authentication();
//         // await sheets.spreadsheets.values.append({
//         //     spreadsheetId: '11WVTVeaTiwAWR6QfFz9osS6MvlZEMJNoYtDDdvz7HYA',
//         //     range: 'Data',

//         //     valueInputOption: 'USER_ENTERED',
//         //     resource: {
//         //         values: [req.body.name, req.body.phone]
//         //     },
//         //   }

//         // );
//         //save_in_sheets(req);


//         // await sendTextMessage(req.body);
//         console.log("message sent");
//         const formData = req.body;
//         res.render("index");


//     } catch (e) {
//         res.status(400).send(e);
//     }

// });

app.use(studentRouter);
app.use(routerTranlate);

app.get("*", (req, res) => {

    res.render("404page");
});

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})