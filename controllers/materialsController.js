const fs = require("fs");
const path = require("path");

function readMaterialsFromFile() {
  const data = fs.readFileSync(
    path.join(__dirname, "../data/materials.json"),
    "utf-8"
  );
  return JSON.parse(data);
}

function writeMaterialsToFile(materials) {
  fs.writeFileSync(
    path.join(__dirname, "../data/materials.json"),
    JSON.stringify(materials, null, 2)
  );
}

// function getAllMaterials(req, res) {
//   try {
//     const materials = readMaterialsFromFile();
//     res.status(200).json(materials);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "مشکلی در دریافت لیست متریال ها پیش آمده است ." });
//   }
// }

async function getAllMaterials() {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Materials');  
      return result.recordset;  
    } catch (err) {
      console.error('Error fetching materials: ', err);
      throw err;
    }
  }
  

function getMaterialById(req, res) {
  const { id } = req.params;
  try {
    const materials = readMaterialsFromFile();
    const material = materials.find((m) => m.id === parseInt(id));
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: "متریال مورد نظر پیدا نشد." });
    }
  } catch (error) {
    res.status(500).json({ message: "مشکلی در دریافت متریال پیش آمده است." });
  }
}

function createMaterial(req, res) {
  const newMaterial = req.body;
  const materials = readMaterialsFromFile();

  newMaterial.id =
    materials.length > 0 ? materials[materials.length - 1].id + 1 : 1;
  materials.push(newMaterial);
  try {
    writeMaterialsToFile(materials);
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ message: "مشکلی در ایجاد ماده جدید پیش آمده است." });
  }
}

function updateMaterial(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const materials = readMaterialsFromFile();
    const materialIndex = materials.findIndex((m) => m.id === parseInt(id));

    if (materialIndex !== -1) {
      const currentMaterial = materials[materialIndex];
      const updatedMaterial = {
        id: currentMaterial.id,
        name: updatedData.name || currentMaterial.name,
        quantity:
          updatedData.quantity !== undefined
            ? updatedData.quantity
            : currentMaterial.quantity,
        supplier: updatedData.supplier || currentMaterial.supplier,
      };
      materials[materialIndex] = updatedMaterial;

      writeMaterialsToFile(materials);
      res.status(200).json(updatedMaterial);
    } else {
      res.status(404).json({ message: "متریال مورد نظر پیدا نشد." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "مشکلی در به‌روزرسانی متریال پیش آمده است." });
  }
}

function deleteMaterial(req, res) {
  const id = parseInt(req.params.id);
  const materials = readMaterialsFromFile();

  const index = materials.findIndex((material) => material.id === id);

  if (index !== -1) {
    materials.splice(index, 1);
    writeMaterialsToFile(materials);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "ماده پیدا نشد." });
  }
}

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
