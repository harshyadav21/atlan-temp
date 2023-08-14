const express = require("express");
const router = new express.Router();
//const app = express();

const sendTextMessage = require("./sendmessage");
const Employee = require("../models/students");
const save_in_sheets = require("./sheets");
// const hbs = require("hbs");
// const path = require("path");
// const template_path = path.join(__dirname, "../templates/views");
// app.set("view engine", "hbs");
// app.set("views", template_path);
router.post("/students", async(req, res) => {

    try {

        const { income, savings } = req.body;
        if (parseInt(income) < parseInt(savings)) {
            return res.status(500).send({
                status: "Failed",
                issue: "Client Income-savings Validation failed!",
                message: "Client monthly Savings Exceeds Client Monthly Income!",
            });

        }
        const user = new Employee(req.body
            //{
            // name: req.body.name,
            // email: req.body.email,
            // phone: req.body.phone,
            // address: req.body.address,
            // income: req.body.income,
            // saings: req.body.savings
            //}
        );
        console.log(typeof req.body);
        console.log(req.body.name);

        createUser = await user.save();
        console.log(typeof createUser);
        // const sheets = await authentication();
        // await sheets.spreadsheets.values.append({
        //     spreadsheetId: '11WVTVeaTiwAWR6QfFz9osS6MvlZEMJNoYtDDdvz7HYA',
        //     range: 'Data',

        //     valueInputOption: 'USER_ENTERED',
        //     resource: {
        //         values: [req.body.name, req.body.phone]
        //     },
        //   }

        // );
        const formData = createUser;
        res.status(201).render("result", { formData });
        await save_in_sheets(req);


        await sendTextMessage(req.body);
        console.log("message sent");

        console.log(typeof formData);



    } catch (e) {
        res.status(400).send(e);
    }

});


// router.get("/students", async(req, res)=>{

//     try{
//         const studentsData = await Employee.find();
//         res.send(studentsData);
//     }
//     catch(e){
//         res.send(e);
//     }

// })


// router.get("/students/:id", async(req,res)=>{
//     try{
//     const _id = req.params.id;
//     const studentData = await Employee.findById(_id);
//     if(!studentData)
//     {
//         return res.status(404).send(studentData);

//     }
//     else{
//         res.send(studentData);
//     }

//     // res.send(studentData);

//     }
//     catch(e){
//         res.status(500).send(e);
//     }
// })

// router.get("/student", (req, res) => {
//     console.log(createUser);
//     res.send(createUser);
// });

module.exports = router;