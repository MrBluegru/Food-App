const { Router } = require("express");
const router = Router();
const { recipeName_All, recipeID, recipeCreate } = require("./recipesF");

router.get("/", recipeName_All);
router.get("/:id", recipeID);
router.post("/", recipeCreate);

module.exports = router;
