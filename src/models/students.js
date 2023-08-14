const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // just for backend testing , for frontend in the html code it is taken care.
        minlength: 3
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator(value) {
                if (value.toString().length != 10) {
                    throw new Error("Invalid phone number format. Must be a 10-digit number.")
                }
                //return /^\d{10}$/.test(value.toString()); // Convert to string before validating
            },
            //message: 'Invalid phone number format. Must be a 10-digit number.'
        },

        // validate(value){
        //     if(validator.length==11)
        //     {val[0]='0'}
        //     else
        //     throw new Error("r")
        // }
        // validate(value){
        //     if(value.length < 10)
        //     {
        //         throw new Error("Number less than 10")
        //     }
        // },
        unique: [true, "Phone number is already present"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    address: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        default: 0,
        required: [true, "Please Enter Your Income(Per annum)!"]

    },
    savings: {
        type: Number,
        default: 0,
        required: [true, "Please Enter Your Income(Per annum)!"]
    }

})

const employee = new mongoose.model('employee', studentSchema);

module.exports = employee;