import express from "express";
import {
  processPayment,
  getKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", processPayment);
router.get("/getkey", getKey);
router.post("/verification", paymentVerification);

export default router;

// import express from "express";
// const router = express.Router()
// import {processPayment , paymentVerification} from "../controller/paymentController.js"
// import {getKey} from "../controller/paymentController.js"


// router.route('/payment/process').post(processPayment)
// router.route('/getKey').get(getKey)
// router.route('/paymentVerification').post(paymentVerification)

// export default router