import express from "express";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";


import {
  processPayment,
  getKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout",verifyToken , authorizeRoles("consumer") , processPayment);
router.get("/getkey",verifyToken , authorizeRoles("consumer"), getKey);
router.post("/verification" , paymentVerification);

export default router;

// import express from "express";
// const router = express.Router()
// import {processPayment , paymentVerification} from "../controller/paymentController.js"
// import {getKey} from "../controller/paymentController.js"


// router.route('/payment/process').post(processPayment)
// router.route('/getKey').get(getKey)
// router.route('/paymentVerification').post(paymentVerification)

// export default router