const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const personController = require("../controllers/personController");
const auth = require("../middlewares/auth");

router.post("/register", catchErrors(personController.register));
router.get("/profilephoto", auth, catchErrors(personController.profilephoto));
router.post("/registercandidate", auth, catchErrors(personController.registercandidate));

module.exports = router;