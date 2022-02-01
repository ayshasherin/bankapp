//import jwt
const req = require('express/lib/request')
const jwt = require('jsonwebtoken')


//importing database aayi connection string varunna file ne import cheythu
const db = require('./db')

database = {
    1000: { acno: 1000, uname: "aysha", password: "1000", balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "sherin", password: "1001", balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "shinu", password: "1002", balance: 5000, transaction: [] }
}

const register = (acno, uname, password) => {

    // let database = this.data

    return db.User.findOne({acno})           
        .then(user => {
            console.log(user);
            if (user) {
                return {
                    status: false,
                    statusCode: 401,
                    message: "ACCOUNT ALREADY EXIST ... PLEASE LOGIN ❗❗"
                }
            }
            else {
                const newUser = new db.User({
                    acno,
                    uname,
                    password,
                    balance: 0,
                    transaction: []
                })
                newUser.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: "ACCOUNT SUCCESSFULLY CREATED ✅"
                }
            }
        })

}



//     if (acno in database) {

//         return {
//             status: false,
//             statusCode: 401,
//             message: "ACCOUNT ALREADY EXIST !!! PLEASE LOGIN"
//         }
//     }
//     else {
//         database[acno] = {
//             acno,
//             uname,
//             password,
//             balance: 0,
//             transaction: []
//         }

//         //   this.saveDetails()
//         return {
//             status: true,
//             statusCode: 200,
//             message: "ACCOUNT SUCCESSFULLY CREATED"
//         }
//     }
// }

const login = (acno, pwd) => {
    // let database = this.data

    return db.User.findOne({
        acno,
        pwd
    }).then(user => {
        if (user) {

            currentUsername = user.uname

            const token = jwt.sign({
                currentAcno: acno
            }, 'supersecretkey123456')

            return {
                status: true,
                statusCode: 200,
                message: "LOGIN SUCCESSFULL ✅",
                currentUsername: currentUsername,
                currentAcno: acno,
                token
            }

        }
        else {
            // alert("INVALID PASSWORD ")
            return {
                status: false,
                statusCode: 401,
                message: "INVALID ACCOUNT / PASSWORD ❗❗"
            }
        }

    })

}

// if (acno in database) {

//     if (pwd == database[acno]["password"]) {

//         currentUsername = database[acno]["uname"]

//         //req.session.currentAcno = acno


//         //token generation
//         const token = jwt.sign({
//             currentAcno: acno
//         }, 'supersecretkey123456') //ipp ezhuthiya secret nn akath enth venelum kodukka bcoz its a string


//         // console.log(req.session);
//         //this.saveDetails()
//         return {
//             status: true,
//             statusCode: 200,
//             message: "LOGIN SUCCESSFULL",
//             currentUsername: currentUsername,
//             currentAcno: acno,
//             token       //ini oraal login cheyth kazhinjaal oru 
//             //token generate aaum pinneed ayaal login cheyyumbol same token used for authentication 
//         }
//     }
//     else {
//         // alert("INVALID PASSWORD ")
//         return {
//             status: false,
//             statusCode: 401,
//             message: "INVALID PASSWORD !!!"
//         }
//     }
// }
// else {
//     //   alert("USER DOESNOT EXIST ")
//     return {
//         status: false,
//         statusCode: 401,
//         message: "INVALID ACCOUNT NUMBER !!!"
//     }
// }
//     }


const deposit = (acno, pwd, amt) => {

    var amount = parseInt(amt)                      // passed with int (to avoid concatenation)

    return db.User.findOne({
        acno,
        pwd
    }).then(user => {
        if (!user) {
            return {
                status: false,
                statusCode: 401,
                message: "INVALID ACCOUNT / PASSWORD ❗❗"
            }
        }
        user.balance += amount
        user.transaction.push({

            amount: amount,
            type: "CREDIT"
        })
        user.save()
        return {
            // database[acno]["balance"]
            status: true,
            statusCode: 200,
            message: amount + " credited! New balance is:" + user.balance
        }
    })
}
//     if (acno in database) {

//         if (pwd == database[acno]["password"]) {

//             database[acno]["balance"] = database[acno]["balance"] + amount
//             database[acno]["transaction"].push({
//                 amount: amount,
//                 type: "CREDIT"
//             })
//             console.log(database[acno]["transaction"]);

//             // this.saveDetails()
//             return {
//                 // database[acno]["balance"]
//                 status: true,
//                 statusCode: 200,
//                 message: amount + " credited! New balance is:" + database[acno]["balance"]
//             }
//         }
//         else {
//             // alert("INVALID PASSWORD ")
//             return {
//                 status: false,
//                 statusCode: 401,
//                 message: "INVALID PASSWORD !!!"
//             }
//         }


//     }
//     else {
//         //   alert("USER NOT FOUND ")
//         return {
//             status: false,
//             statusCode: 401,
//             message: "USER NOT FOUND !!!"
//         }
//     }

// }


const withdraw = (req,acno,pwd,amt) => {

    var amount = parseInt(amt)
    // let database = this.data

    return db.User.findOne({
        acno,
        pwd
    }).then(user => {

        if(req.currentAcno != acno){
            return {
                status: false,
                statusCode: 401,
                message: "OPERATION DENIED ❗❗"
            }
        }


        if (!user) {
            return {
                status: false,
                statusCode: 401,
                message: "INVALID ACCOUNT / PASSWORD ❗❗"
            }
        }
        if (user.balance < amount) {
            return {
                status: false,
                statusCode: 401,
                message: "INSUFFICIENT BALANCE ❗❗"

            }
        }
        user.balance -= amount
        user.transaction.push({

            amount: amount,
            type: "DEBIT"
        })
        user.save()
        return {
            // database[acno]["balance"]
            status: true,
            statusCode: 200,
            message: amount + " debited! New balance is:" + user.balance
        }
    })
}


//     if (acno in database) {

//         if (pwd == database[acno]["password"]) {

//             if (database[acno]["balance"] > amount) {

//                 database[acno]["balance"] = database[acno]["balance"] - amount
//                 database[acno]["transaction"].push({
//                     amount: amount,
//                     type: "DEBIT"
//                 })
//                 console.log(database[acno]["transaction"]);

//                 // this.saveDetails()
//                 return {
//                     // database[acno]["balance"]

//                     status: true,
//                     statusCode: 200,
//                     message: amount + " debited! New balance is:" + database[acno]["balance"]
//                 }
//             }
//             else {
//                 // alert("INSUFFICIENT BALANCE ")
//                 return {
//                     status: false,
//                     statusCode: 401,
//                     message: "INSUFFICIENT BALANCE !!!"

//                 }
//             }
//         }
//         else {
//             // alert("INVALID PASSWORD ")
//             return {
//                 status: false,
//                 statusCode: 401,
//                 message: "INVALID PASSWORD !!!"

//             }
//         }


//     }
//     else {
//         //   alert("USER NOT FOUND ")
//         return {
//             status: false,
//             statusCode: 401,
//             message: "USER NOT FOUND !!!"
//         }
//     }

// }

const getTransaction = (acno) => {


    return db.User.findOne({ acno })
        .then(user => {
            if (!user) {
                return {
                    status: false,
                    statusCode: 401,
                    message: "USER NOT FOUND ❗❗"
                }
            }

            return {
                status: true,
                statusCode: 200,
                transaction: user.transaction
            }
        })
}

//     if (acno in database) {
//         return {
//             status: true,
//             statusCode: 200,
//             transaction: database[acno]["transaction"]                    //this.data[acno]["transaction"]
//         }

//     }
//     else {
//         return {
//             status: false,
//             statusCode: 401,
//             message: "USER NOT FOUND !!!"
//         }
//     }

// }




//deleteAcc
const deleteAcc=(acno)=>{
return db.User.deleteOne({
    acno
}).then(user=>{
    if(!user){
        return {
            status: false,
            statusCode: 401,
            message: "USER NOT FOUND"
        }
    }
    return {
        // database[acno]["balance"]
        status: true,
        statusCode: 200,
        message:"ACCOUNT NUMBER " +acno+ " DELETED SUCCESSFULLY"                      
    }
})
}



//we should export bcoz to use its properties in another file
module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc

}

