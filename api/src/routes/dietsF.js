const { Diet } = require("../db.js");

const dietsAll = async (req, res) => {
  try {
    const dietsDB = await Diet.findAll();
    res.status(200).send(dietsDB);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las dietas" });
  }
};

module.exports = { dietsAll };
