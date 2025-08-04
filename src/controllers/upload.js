const handleFileUpload = require("../middleware/upload");
const ftp = require("basic-ftp");
require("dotenv").config();
const mime = require("mime-types");
const { Sequelize } = require("sequelize");
const {
  User,
  File,
  Folder,
  CreateFolder,
  Share,
  SharedWith,
  CommitteeGroup,
  DownloadedBy
} = require("../config/dbConnector");
const Op = Sequelize.Op;

const ftpCredentials = {
  Finance: {
    host: process.env.FTP_HOST_FINANCE,
    user: process.env.FTP_USER_FINANCE,
    password: process.env.FTP_PASSWORD_FINANCE,
  },
  Insurance: {
    host: process.env.FTP_HOST_INSURANCE,
    user: process.env.FTP_USER_INSURANCE,
    password: process.env.FTP_PASSWORD_INSURANCE,
  },
  loan: {
    host: process.env.FTP_HOST_LOAN,
    user: process.env.FTP_USER_LOAN,
    password: process.env.FTP_PASSWORD_LOAN,
  },
  ppf_gf: {
    host: process.env.FTP_HOST_PPF_GF,
    user: process.env.FTP_USER_PPF_GF,
    password: process.env.FTP_PASSWORD_PPF_GF,
  },
  "Information Technology": {
    host: process.env.FTP_HOST_IT,
    user: process.env.FTP_USER_IT,
    password: process.env.FTP_PASSWORD_IT,
  },
  HRAD: {
    host: process.env.FTP_HOST_HRAD,
    user: process.env.FTP_USER_HRAD,
    password: process.env.FTP_PASSWORD_HRAD,
  },
  "Credit & Investment": {
    host: process.env.FTP_HOST_CREDIT,
    user: process.env.FTP_USER_CREDIT,
    password: process.env.FTP_PASSWORD_CREDIT,
  },
  Management: {
    host: process.env.FTP_HOST_MANAGEMENT,
    user: process.env.FTP_USER_MANAGEMENT,
    password: process.env.FTP_PASSWORD_MANAGEMENT,
  },
  "Internal Audit": {
    host: process.env.FTP_HOST_AUDIT,
    user: process.env.FTP_USER_AUDIT,
    password: process.env.FTP_PASSWORD_AUDIT,
  },
  "Company Secretary": {
    host: process.env.FTP_HOST_SECRETARY,
    user: process.env.FTP_USER_SECRETARY,
    password: process.env.FTP_PASSWORD_SECRETARY,
  },
  Marketing: {
    host: process.env.FTP_HOST_MARKETING,
    user: process.env.FTP_USER_MARKETING,
    password: process.env.FTP_PASSWORD_MARKETING,
  },
  Compliance: {
    host: process.env.FTP_HOST_COMPLIANCE,
    user: process.env.FTP_USER_COMPLIANCE,
    password: process.env.FTP_PASSWORD_COMPLIANCE,
  },
  "Corporate Strategy & Business Development": {
    host: process.env.FTP_HOST_CSBD,
    user: process.env.FTP_USER_CSBD,
    password: process.env.FTP_PASSWORD_CSBD,
  },
  Phuentsholing: {
    host: process.env.FTP_HOST_PHUENTSHOLING,
    user: process.env.FTP_USER_PHUENTSHOLING,
    password: process.env.FTP_PASSWORD_PHUENTSHOLING,
  },
  Wangdue: {
    host: process.env.FTP_HOST_WANGDUE,
    user: process.env.FTP_USER_WANGDUE,
    password: process.env.FTP_PASSWORD_WANGDUE,
  },
  Paro: {
    host: process.env.FTP_HOST_PARO,
    user: process.env.FTP_USER_PARO,
    password: process.env.FTP_PASSWORD_PARO,
  },
  Gelephu: {
    host: process.env.FTP_HOST_GELEPHU,
    user: process.env.FTP_USER_GELEPHU,
    password: process.env.FTP_PASSWORD_GELEPHU,
  },
  Babesa: {
    host: process.env.FTP_HOST_BABESA,
    user: process.env.FTP_USER_BABESA,
    password: process.env.FTP_PASSWORD_BABESA,
  },
  "Thimphu City": {
    host: process.env.FTP_HOST_THIMPHU_CITY,
    user: process.env.FTP_USER_THIMPHU_CITY,
    password: process.env.FTP_PASSWORD_THIMPHU_CITY,
  },
  "Paro Lango": {
    host: process.env.FTP_HOST_PARO_LANG0,
    user: process.env.FTP_USER_PARO_LANG0,
    password: process.env.FTP_PASSWORD_PARO_LANG0,
  },
  "Samdrup Jongkhar": {
    host: process.env.FTP_HOST_SAMDRUP_JONGKHAR,
    user: process.env.FTP_USER_SAMDRUP_JONGKHAR,
    password: process.env.FTP_PASSWORD_SAMDRUP_JONGKHAR,
  },
  Mongar: {
    host: process.env.FTP_HOST_MONGAR,
    user: process.env.FTP_USER_MONGAR,
    password: process.env.FTP_PASSWORD_MONGAR,
  },
  Bumthang: {
    host: process.env.FTP_HOST_BUMTHANG,
    user: process.env.FTP_USER_BUMTHANG,
    password: process.env.FTP_PASSWORD_BUMTHANG,
  },
  Trashigang: {
    host: process.env.FTP_HOST_TRASHIGANG,
    user: process.env.FTP_USER_TRASHIGANG,
    password: process.env.FTP_PASSWORD_TRASHIGANG,
  },
  Tsirang: {
    host: process.env.FTP_HOST_TSIRANG,
    user: process.env.FTP_USER_TSIRANG,
    password: process.env.FTP_PASSWORD_TSIRANG,
  },
  Trongsa: {
    host: process.env.FTP_HOST_TRONGSA,
    user: process.env.FTP_USER_TRONGSA,
    password: process.env.FTP_PASSWORD_TRONGSA,
  },
  Samtse: {
    host: process.env.FTP_HOST_SAMTSE,
    user: process.env.FTP_USER_SAMTSE,
    password: process.env.FTP_PASSWORD_SAMTSE,
  },
  Zhemgang: {
    host: process.env.FTP_HOST_ZHEMGANG,
    user: process.env.FTP_USER_ZHEMGANG,
    password: process.env.FTP_PASSWORD_ZHEMGANG,
  },
  Nganglam: {
    host: process.env.FTP_HOST_NGANGLAM,
    user: process.env.FTP_USER_NGANGLAM,
    password: process.env.FTP_PASSWORD_NGANGLAM,
  },
  Khuruthang: {
    host: process.env.FTP_HOST_KHURUTHANG,
    user: process.env.FTP_USER_KHURUTHANG,
    password: process.env.FTP_PASSWORD_KHURUTHANG,
  },
  Gedu: {
    host: process.env.FTP_HOST_GEDU,
    user: process.env.FTP_USER_GEDU,
    password: process.env.FTP_PASSWORD_GEDU,
  },
  Haa: {
    host: process.env.FTP_HOST_HAA,
    user: process.env.FTP_USER_HAA,
    password: process.env.FTP_PASSWORD_HAA,
  },
  Trashiyangtse: {
    host: process.env.FTP_HOST_TRASHIYANGTSE,
    user: process.env.FTP_USER_TRASHIYANGTSE,
    password: process.env.FTP_PASSWORD_TRASHIYANGTSE,
  },
  Dagapela: {
    host: process.env.FTP_HOST_DAGAPELA,
    user: process.env.FTP_USER_DAGAPELA,
    password: process.env.FTP_PASSWORD_DAGAPELA,
  },
  Tashichhoeling: {
    host: process.env.FTP_HOST_TASHICHHOELING,
    user: process.env.FTP_USER_TASHICHHOELING,
    password: process.env.FTP_PASSWORD_TASHICHHOELING,
  },
};

const multipleUpload = async (req, res) => {
  try {
    const folderID = await handleFileUpload(req);

    const path = encodeURIComponent(req.body.path);

    // Construct URL with folderID and path query param
    const dynamicURL = `/FolderContent/${folderID}?path=${path}`;
    return res.redirect(dynamicURL);
  } catch (error) {
    console.error(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      req.flash("error", "Too many files to upload.");
      return res.status(400).redirect(req.headers.referer || "/FolderList");
    }

    req.flash("error", error.message || "Error when trying to upload files.");
    return res.status(500).redirect(req.headers.referer || "/FolderList");
  }
};

//for size calculation
const formatFileSize = (size) => {
  if (size === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return parseFloat((size / Math.pow(1024, i)).toFixed(2)) + " " + units[i];
};

// for files counnt
const countFolders = async () => {
  const count = await Folder.count({
    where: {
      uploadType: 'Folder'
    }
  });
  return count;
};

function getFileIcon(fileName) {
  const ext = fileName.split(".").pop().toLowerCase();
  switch (ext) {
    case "pdf":
      return "teenyicons:pdf-outline";
    case "doc":
      return "teenyicons:ms-word-outline";
    case "docx":
      return "teenyicons:ms-word-outline";
    case "xls":
      return "uiw:file-excel";
    case "xlsx":
      return "uiw:file-excel";
    case "ppt":
    case "pptx":
      return "teenyicons:ppt-outline";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "fas fa-file-image";
    case "zip":
    case "rar":
      return "lsicon:file-rar-outline";
    case "txt":
      return "teenyicons:ppt-outline";
    default:
      return "fas fa-file";
  }
}

const getScan = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const loggedInUserId = req.session.userId;
    const user = await UserModel.findById(loggedInUserId);
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/upload");
    }

    const loggedInUserDepartment = user.department;

    const usersInSameDepartment = await UserModel.find({
      department: loggedInUserDepartment,
      _id: { $ne: loggedInUserId },
    });

    const userIdsInSameDepartment = usersInSameDepartment.map(
      (user) => user._id
    );

    const folders = await FolderModel.find({
      $or: [
        { uploadedBy: loggedInUserId },
        { uploadedBy: { $in: userIdsInSameDepartment } },
      ],
    })
      .populate("uploadedBy", "username department")
      .populate("files.uploadedBy", "username department")
      .skip(skip)
      .limit(limit);

    // Calculate file count for each folder
    folders.forEach((folder) => {
      folder.fileCount = folder.files.length;
    });

    const count = await FolderModel.countDocuments({
      $or: [
        { uploadedBy: loggedInUserId },
        { uploadedBy: { $in: userIdsInSameDepartment } },
      ],
    });
    const totalPages = Math.ceil(count / limit);

    return res.render("SaveScan", {
      limit,
      folders,
      currentPage: page,
      totalPages,
      loggedInUserId,
      formatFileSize,
      getFileIcon,
      user,
    });
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getFolderContents = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const loggedInUserId = req.session.userId;

    const user = await User.findByPk(loggedInUserId);
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/upload");
    }

    const folderId = req.params.folderId;

    // Get folder
    const folder = await Folder.findByPk(folderId, {
      include: [
        {
          model: File,
          as: "files",
          include: [
            {
              model: User,
              as: "uploader", // Use the alias if you have one in the association
              attributes: ["name", "department"],
            },
          ],
          offset,
          limit,
        },
        {
          model: User,
          as: "uploader", // Alias for who uploaded the folder
          attributes: ["name", "department"],
        },
      ],
    });

    if (!folder) {
      return res.status(404).render("error", { message: "Folder not found" });
    }

    const totalItems = await File.count({ where: { folderId: folderId } });

    res.render("eachFiles.ejs", {
      folder,
      formatFileSize,
      getFileIcon,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      user,
    });
  } catch (err) {
    console.error("Error fetching folder contents:", err);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

//creating a folder root
const createFolder = async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    if (!req.body || !req.body.folderName) {
      return res.status(400).json({ error: "Folder name is required." });
    }

    const { folderName } = req.body;

    // Sanitize folder name
    const sanitizeFolderName = (name) =>
      name.replace(/[\\/:*?"<>|]/g, "").trim();
    const sanitizedFolderName = sanitizeFolderName(folderName);

    if (!sanitizedFolderName) {
      return res.status(400).json({ error: "Invalid folder name." });
    }

    const loggedInUserId = req.session.userId;
    if (!loggedInUserId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not logged in." });
    }

    const user = await User.findByPk(loggedInUserId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const department = user.department;

    const ftpConfig = ftpCredentials[department];
    if (!ftpConfig) {
      return res.status(404).json({ error: "Department not configured." });
    }

    await client.access(ftpConfig);

    // Ensure the directory exists
    const folderPath = `${department}/${sanitizedFolderName}`;
    await client.ensureDir(folderPath);
    // console.log(
    //   `✅ Folder '${sanitizedFolderName}' created successfully in ${department}.`
    // );

    // Save folder in MongoDB
    const newFolder = new CreateFolder({
      folderName: sanitizedFolderName,
      createdBy: loggedInUserId,
      department,
      path: folderPath,
    });

    await newFolder.save();
    req.flash(
      "success",
      `Folder '${sanitizedFolderName}' created successfully.`
    );
    res.status(201).json({
      message: `Folder '${sanitizedFolderName}' created successfully.`,
      folderId: newFolder._id,
      folderPath,
    });
  } catch (err) {
    console.error("❌ Error creating folder:", err);
    res
      .status(500)
      .json({ error: "Failed to create folder.", details: err.message });
  } finally {
    client.close();
  }
};

//testing
const checkFolder = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    // Count total folders
    const totalItems = await CreateFolder.count();

    // Get logged-in user
    const loggedInUserId = req.session.userId;
    const user = await User.findByPk(loggedInUserId);
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/upload");
    }

    // Get folders created by logged-in user with pagination
    const folders = await CreateFolder.findAll({
      where: {
        createdBy: loggedInUserId,
      },
      include: [
        {
          model: User,
          as: "creator", // adjust alias based on your association setup
          attributes: ["name", "department"],
        },
      ],
      offset,
      limit,
    });

    const totalPages = Math.ceil(totalItems / limit);

    return res.render("viewCreatedFolder", {
      limit,
      folders,
      currentPage: page,
      totalPages,
      loggedInUserId,
      user,
    });
  } catch (err) {
    console.error("Error fetching folders:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const FolderContent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const folderId = req.params.id;

    // Fetch all users and groups for the view (optional)
    const allUsers = await User.findAll({
      attributes: ["id", "name", "department"],
    });

    const allgroups = await CommitteeGroup.findAll({
      attributes: ["id", "groupName"],
    });

    // Get logged-in user info
    const loggedInUserId = req.session.userId;
    const user = await User.findByPk(loggedInUserId);
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/upload");
    }

    // Check if parent folder exists (CreateFolder model)
    const parentFolder = await CreateFolder.findByPk(folderId);
    if (!parentFolder) {
      return res.status(404).send("Folder not found");
    }

    // 1. Fetch child folders linked to parent folder (paginated)
    const { rows: childFolders, count: totalChildFolders } =
      await Folder.findAndCountAll({
        where: { linkedFolder: folderId },
        offset,
        limit,
        include: [
          {
            model: User,
            as: "uploader",
            attributes: ["id", "name", "department"],
          },
        ],
        order: [["id", "ASC"]],
      });

    // 2. Separate real folders and file-wrapper folders
    const realChildFolders = childFolders.filter(
      (f) => f.uploadType === "Folder" && f.folderName !== null
    );

    const fileWrapperFolders = childFolders.filter(
      (f) => f.uploadType === "Files" && f.folderName === null
    );

    // 3. For each wrapper folder, fetch its files (files linked by folderId)
    // We do this here instead of eager loading, since files are only in File model
    // Using Promise.all to fetch files of all wrappers in parallel
    const filesFromFileWrappers = (
      await Promise.all(
        fileWrapperFolders.map(async (folder) => {
          const files = await File.findAll({
            where: { folderId: folder.id },
            include: [
              {
                model: User,
                as: "uploader",
                attributes: ["id", "name", "department"],
              },
            ],
            attributes: [
              "id",
              "filename",
              "folderId",
              "uploadedBy",
              "size",
              "date",
            ],
            order: [["id", "ASC"]],
          });

          // Add wrapper folder name to each file
          files.forEach((file) => {
            file.dataValues.parentWrapperName = folder.folderName;
          });

          return files;
        })
      )
    ).flat();
    // 4. Fetch files uploaded directly to the parent folder (folderName=null)
    // Files where linkedFolder = parent folderId and folder's folderName = null and uploadType = 'File'
    const directUploadFiles = await File.findAll({
      where: { linkedFolder: folderId },
      include: [
        {
          model: Folder,
          as: "folder",
          where: {
            folderName: null,
            uploadType: "File",
          },
          attributes: ["id", "folderName", "uploadType"],
        },
        {
          model: User,
          as: "uploader",
          attributes: ["id", "name", "department"],
        },
      ],
      order: [["id", "ASC"]],
    });

    // Tag direct upload files
    directUploadFiles.forEach((file) => {
      file.dataValues.parentWrapperName = "Direct Upload";
    });

    // 5. Combine all files to render
    const allFilesToRender = [...filesFromFileWrappers, ...directUploadFiles];

    // 6. Prepare IDs for sharing lookup
    const folderIds = childFolders.map((f) => f.id);
    const fileIds = allFilesToRender.map((f) => f.id);

    // 7. Fetch shares for folders and files
    const shares = await Share.findAll({
      where: {
        [Sequelize.Op.or]: [
          { folderId: folderIds.length ? folderIds : null },
          { fileId: fileIds.length ? fileIds : null },
        ],
      },
      include: [
        { model: User, as: "sharer" },
        { model: SharedWith, as: "sharedWith" }, // include sharedWith to know share details
      ],
    });

    // Attach sharing info and status to folders

    childFolders.forEach((folder) => {
      const shareEntry = shares.find(
        (s) => String(s.folderId) === String(folder.id)
      );
      folder.sharedWith = shareEntry ? shareEntry.sharedWith : [];
      folder.sharingStatus = shareEntry ? "Sharing" : "Private";
    });

    // Attach sharing info and status to files
    allFilesToRender.forEach((file) => {
      const fileShare = shares.find(
        (s) => String(s.fileId) === String(file.id)
      );
      file.sharedWith = fileShare ? fileShare.sharedWith : [];
      file.sharingStatus = fileShare ? "Sharing" : "Private";
    });

    // 10. Prepare final object for rendering
    const folder = {
      id: parentFolder.id,
      folderName: parentFolder.folderName,
      Folders: realChildFolders,
      Files: allFilesToRender,
    };

    // 11. Render the view
    res.render("eachFiles copy.ejs", {
      folder,
      getFileIcon,
      formatFileSize,
      shares,
      user,
      allUsers,
      allgroups,
      currentPage: page,
      totalPages: Math.ceil(totalChildFolders / limit),
      userSessionId: req.session.userId,
    });
  } catch (err) {
    console.error("❌ Error in FolderContent:", err);
    res.status(500).send("Internal server error");
  }
};
//log the donwload who ever download the files
const logDownload = async (fileId, userId) => {
  try {
    // Try to find Share by fileId
    let share = await Share.findOne({ where: { fileId } });

    if (!share) {
      // Find Folder containing the file
      const folder = await Folder.findOne({
        include: [{
          model: File,
          as: 'files',
          where: { id: fileId },
        }]
      });

      if (!folder) return;

      // Find Share by folderId
      share = await Share.findOne({ where: { folderId: folder.id } });
      if (!share) return;
    }

    // Check if DownloadedBy record exists for this shareId and userId
    const existingLog = await DownloadedBy.findOne({
      where: {
        shareId: share.id,
        userId: userId,
      }
    });

    if (!existingLog) {
      // Create a new DownloadedBy record
      await DownloadedBy.create({
        shareId: share.id,
        userId,
        downloadedAt: new Date()
      });
    }
  } catch (err) {
    console.error("🔥 Error logging download:", err);
  }
};

//function to view the files or downlaod form qnap 
const viewFileFromQNAP = async (req, res) => {
  const fileId = req.params.fileId;
  const loggedInUserId = req.session.userId;
  const client = new ftp.Client();

  // Detect if client aborted the request early (closed tab, etc)
  req.on("close", () => {
    console.log("Client aborted the request.");
    client.close(); // make sure to close FTP client to free resources
  });

  try {
    const user = await User.findByPk(loggedInUserId);
    if (!user) return res.status(404).send("User not found");

    const department = user.department;
    const ftpConfig = ftpCredentials[department];
    if (!ftpConfig) return res.status(404).send("Department not configured");

    const file = await File.findOne({
      where: { id: fileId },
      include: [
        { model: Folder, as: "folder" },
        { model: CreateFolder, as: "linkedFolderRef" },
      ],
    });

    if (!file) return res.status(404).send("File not found in database");
    await logDownload(file.id, loggedInUserId);
    const folderPath = `${file.linkedFolderRef?.path || ""}/${file.folder?.folderName || ""}`
      .replace(/\/+/g, "/")
      .trim();

    if (!folderPath) return res.status(500).send("Folder path missing");

    const remoteFilePath = `/${folderPath}/${file.filename}`.replace(/\/+/g, "/").trim();

    const mimeType = mime.lookup(file.filename) || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);

    // For PDFs, open inline in browser
    if (mimeType === "application/pdf") {
      res.setHeader("Content-Disposition", `inline; filename="${file.filename}"`);
    } else {
      // For others, force download
      res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
    }

    await client.access(ftpConfig);
    await client.downloadTo(res, remoteFilePath);
  } catch (err) {
    // Ignore stream premature close errors (common when client closes tab)
    if (err.code === "ERR_STREAM_PREMATURE_CLOSE") {
      // console.log("Stream closed prematurely by client, ignoring...");
    } else {
      console.error("Error retrieving file:", err);
      if (!res.headersSent) res.status(500).send("Internal Server Error");
    }
  } finally {
    client.close();
  }
};
module.exports = {
  multipleUpload,
  getScan,
  getFolderContents,
  createFolder,
  checkFolder,
  FolderContent,
  viewFileFromQNAP,
};
