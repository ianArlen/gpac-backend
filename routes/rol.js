const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const rolController = require("../controllers/rolController");
const auth = require("../middlewares/auth");

router.post("/relation", catchErrors(rolController.relation));
router.get("/market", auth, catchErrors(rolController.hierarchy));
router.get("/map", auth, catchErrors(rolController.locationmap));

module.exports = router;