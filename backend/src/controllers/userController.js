import Web3 from "web3";
import UsersModel from "../models/UsersModel.js";  

const web3 = new Web3();

// export async function login(req, res) {
//     try {
//         console.log("Received body:", req.body);

//         const { userAddress, signature, nonce } = req.body;
//         const message = `Sign this message to log in: ${nonce}`;
        
//         const recoveredAddress = web3.eth.accounts.recover(message, signature);
        
//         if (recoveredAddress.toLowerCase() !== userAddress.toLowerCase()) {
//             return res.status(401).json({ error: "Invalid signature" });
//         }

//         let user = await UsersModel.findOne({ ethereumAddress: userAddress }); // Correct `findOne` usage

//         if (!user) {
//             user = new UsersModel({  // Corrected `UsersModel` instead of `User`
//                 ethereumAddress: userAddress, 
//                 username: "New User", 
//                 role: "student"
//             });
//             await user.save();
//         }

//         res.json({ message: "Login successful", user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

export async function login(req, res) {
    try {
        const { userAddress, signature, nonce } = req.body;
        const message = `Sign this message to log in: ${nonce}`;
        
        const recoveredAddress = web3.eth.accounts.recover(message, signature);
        
        if (recoveredAddress.toLowerCase() !== userAddress.toLowerCase()) {
            return res.status(401).json({ error: "Invalid signature" });
        }

        let user = await UsersModel.findOne({ ethereumAddress: userAddress });

        if (!user) {
            user = new UsersModel({ ethereumAddress: userAddress, username: "New User", role: "student" });
            await user.save();
        }

        // ✅ Store user details in session
        req.session.user = {
            ethereumAddress: user.ethereumAddress,
            role: user.role
        };

        res.json({ message: "Login successful", redirect: "/dashboard" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


