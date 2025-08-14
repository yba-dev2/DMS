const {
  User,
  File,
  Folder,
  CreateFolder,
} = require("../config/dbConnector");
const { ERPURL } = require("../config/ErpURL");


async function deepSearchWithFilter(folderId, keyword, department) {
  keyword = keyword.toLowerCase();
  const matches = [];

  // Get base folder
  const baseFolder = await CreateFolder.findOne({ where: { id: folderId } });
  if (!baseFolder || baseFolder.department !== department) return [];

  // Get all folders under this CreateFolder
  const entries = await Folder.findAll({
    where: { linkedFolder: folderId },
    include: [{ model: User, as: "uploadedByUser", attributes: ["username"] }]
  });

  for (const entry of entries) {
    // Folder name match
    if (entry.folderName && entry.folderName.toLowerCase().includes(keyword)) {
      matches.push({
        type: "folder",
        name: entry.folderName,
        date: entry.date,
        uploadedBy: entry.uploadedByUser?.username || "N/A",
        department: baseFolder.department
      });
    }

    // Get files in this folder
    const files = await File.findAll({ where: { folderId: entry.id } });

    for (const file of files) {
      const originalNameMatch =
        file.originalname &&
        file.originalname.toLowerCase().includes(keyword);
      const filenameMatch =
        file.filename &&
        file.filename.toLowerCase().includes(keyword);

      if (originalNameMatch || filenameMatch) {
        matches.push({
          type: "file",
          name: file.originalname || file.filename,
          filename: file.filename,
          date: file.date,
          uploadedBy: entry.uploadedByUser?.username || "N/A",
          department: baseFolder.department
        });
      }
    }

    // Recursive search in child folders (Folders that belong to this CreateFolder)
    const childMatches = await deepSearchWithFilter(entry.id, keyword, department);
    matches.push(...childMatches);
  }

  return matches;
}

async function deepSearchInDepartment(department, keyword) {
  const topLevelFolders = await CreateFolder.findAll({ where: { department } });
  const allMatches = [];

  for (const folder of topLevelFolders) {
    const matches = await deepSearchWithFilter(folder.id, keyword, department);
    allMatches.push(...matches);
  }

  return allMatches;
}

const showSearchPage = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user) {
      req.flash("error", "User not found!");
      return res.redirect(`${ERPURL}`);
    }

    const { keyword } = req.query;
    const department = user.department;

    if (!keyword || !department) {
      return res.render("DeepSearch.ejs", { matches: [], keyword, user });
    }

    const matches = await deepSearchInDepartment(department, keyword);

    res.render("DeepSearch.ejs", {
      matches,
      keyword,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during search");
  }
};

module.exports = {
  showSearchPage,
};
