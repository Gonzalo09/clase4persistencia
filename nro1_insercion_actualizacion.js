const Sequelize = require("sequelize");

const sequelize = new Sequelize("clase4", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

class Gaseosa extends Sequelize.Model {}
Gaseosa.init(
  {
    nombre: Sequelize.STRING,
    precio: Sequelize.INTEGER,
    tamaño: Sequelize.FLOAT,
  },
  { sequelize, modelName: "gaseosas" }
);

sequelize
  .sync()
  .then(() =>
    Gaseosa.create({
      nombre: "CocaCola",
      precio: 300,
      tamaño: 1.5,
    })
  )
  .then((jane) => {
    console.log(jane.toJSON());
  });

sequelize
  .sync()
  .then(() =>
    Gaseosa.update(
      { precio: 350 },
      {
        where: {
          nombre: "CocaCola",
        },
      }
    )
  )
  .then(() => {
    console.log("Done");
  });
