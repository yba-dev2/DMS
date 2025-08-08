const handleFileUpload = require("../middleware/upload");
const ftp = require("basic-ftp");
const stream = require("stream");
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
  
  try {
    console.log(`Starting download for fileId: ${fileId}, userId: ${loggedInUserId}`);
    
    // Step 1: Get the logged-in user (for permissions)
    const loggedInUser = await User.findByPk(loggedInUserId);
    if (!loggedInUser) {
      console.error("Logged-in user not found:", loggedInUserId);
      return res.status(404).send("User not found");
    }
    
    // Step 2: Get File with its owner/uploader information
    const file = await File.findOne({
      where: { id: fileId },
      include: [
        { model: Folder, as: "folder" },
        { model: CreateFolder, as: "linkedFolderRef" },
        { 
          model: User, 
          as: "uploader", // or whatever your association is called
          attributes: ['id', 'department', 'name'] // Get the file owner's department
        }
      ]
    });
    
    if (!file) {
      console.error("File not found:", fileId);
      return res.status(404).send("File not found");
    }
    
    // Step 3: Determine which QNAP to use based on file owner's department
    let fileOwnerDepartment;
    
    if (file.uploader && file.uploader.department) {
      // If file has uploader info, use that department
      fileOwnerDepartment = file.uploader.department;
      console.log("Using file owner's department:", fileOwnerDepartment);
    } else if (file.linkedFolderRef && file.linkedFolderRef.createdBy) {
      // Alternative: get department from folder creator
      const folderCreator = await User.findByPk(file.linkedFolderRef.createdBy);
      fileOwnerDepartment = folderCreator?.department;
      console.log("Using folder creator's department:", fileOwnerDepartment);
    } else {
      // Fallback: try to determine from folder path
      const folderPath = file.linkedFolderRef?.path;
      if (folderPath) {
        // Extract department from path (assuming first part is department)
        const pathParts = folderPath.split('/');
        const possibleDepartment = pathParts[0];
        
        // Check if this matches any of your department names in ftpCredentials
        if (ftpCredentials[possibleDepartment]) {
          fileOwnerDepartment = possibleDepartment;
          console.log("Using department from path:", fileOwnerDepartment);
        }
      }
    }
    
    // Step 4: Get FTP config for the file owner's department
    if (!fileOwnerDepartment) {
      console.error("Could not determine file owner's department for fileId:", fileId);
      return res.status(500).send("Could not determine file location");
    }
    
    const ftpConfig = ftpCredentials[fileOwnerDepartment];
    if (!ftpConfig) {
      console.error("FTP config not found for department:", fileOwnerDepartment);
      return res.status(404).send("File location not configured");
    }
    
    console.log("File details:", {
      id: file.id,
      originalname: file.originalname,
      folderPath: file.linkedFolderRef?.path,
      ownerDepartment: fileOwnerDepartment,
      loggedInUserDepartment: loggedInUser.department
    });
    
    // Step 5: Check access permissions for cross-department access
    const sharedWith = await SharedWith.findOne({
      where: { userId: loggedInUserId },
      include: {
        model: Share,
        as: "share",
        where: { fileId: fileId }
      }
    });
    
    // if (!sharedWith && fileOwnerDepartment !== loggedInUser.department) {
    //   console.log("User trying to access file from different department without sharing");
    //   return res.status(403).send("You don't have permission to access this file");
    // }
    
    const accessLevel = sharedWith?.access || "write";
    console.log("Access level:", accessLevel);
    
    // Step 6: Construct file path
    const folderPath = file.linkedFolderRef?.path;
    if (!folderPath) {
      console.error("Folder path missing for file:", fileId);
      return res.status(500).send("Folder path missing");
    }
    
    const remoteFilePath = `/${folderPath}/${file.originalname}`
      .replace(/\/+/g, "/")
      .trim();
    
    console.log("Connecting to FTP server for department:", fileOwnerDepartment);
    console.log("Remote file path:", remoteFilePath);
    
    const mimeType = mime.lookup(file.originalname) || "application/octet-stream";
    
    // Step 7: Connect to the correct QNAP server
    await client.access(ftpConfig);
    console.log("FTP connection established");
    
    // Check if file exists
    try {
      const fileSize = await client.size(remoteFilePath);
      console.log(`File size on server: ${fileSize} bytes`);
    } catch (sizeError) {
      console.error("File not found on FTP server:", remoteFilePath);
      
      // Try to list directory for debugging
      try {
        const directoryPath = remoteFilePath.substring(0, remoteFilePath.lastIndexOf('/'));
        console.log("Checking directory:", directoryPath);
        const files = await client.list(directoryPath);
        console.log("Files in directory:", files.map(f => f.name));
      } catch (listError) {
        console.error("Could not list directory contents:", listError.message);
      }
      
      return res.status(404).send("File not found on server");
    }
    
    // Step 8: Download file
    const writableStream = new stream.PassThrough();
    const fileBufferPromise = new Promise((resolve, reject) => {
      const chunks = [];
      let totalSize = 0;
      
      writableStream.on("data", chunk => {
        chunks.push(chunk);
        totalSize += chunk.length;
      });
      
      writableStream.on("end", () => {
        console.log(`Download completed. Total size: ${totalSize} bytes`);
        resolve(Buffer.concat(chunks));
      });
      
      writableStream.on("error", reject);
    });
    
    await client.downloadTo(writableStream, remoteFilePath);
    const fileBuffer = await fileBufferPromise;
    
    // Step 9: Handle PDF files
    if (mimeType === "application/pdf") {
      console.log("Processing PDF file");
      try {
        const pdfDoc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
        const newPdfDoc = await PDFDocument.create();
        const copiedPages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach(page => newPdfDoc.addPage(page));
        const restrictedPdfBytes = await newPdfDoc.save();
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", restrictedPdfBytes.length);
        res.setHeader("Content-Disposition", `inline; filename="${encodeURIComponent(file.originalname)}"`);
        
        return res.send(Buffer.from(restrictedPdfBytes));
      } catch (pdfError) {
        console.error("PDF processing error:", pdfError);
        // Fall back to original file
      }
    }
    
    // Step 10: Handle other file types
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", fileBuffer.length);
    
    if (accessLevel === "NoDownload") {
      console.log("Access denied for download");
      return res.status(403).send("You do not have permission to download this file.");
    }
    
    res.setHeader("Content-Disposition", `inline; filename="${encodeURIComponent(file.originalname)}"`);
    res.send(fileBuffer);
    
  } catch (err) {
    console.error("Error retrieving file:", err);
    console.error("Error stack:", err.stack);
    
    if (!res.headersSent) {
      if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
        res.status(503).send("File server unavailable");
      } else if (err.code === 'ENOENT') {
        res.status(404).send("File not found on server");
      } else {
        res.status(500).send("Internal Server Error");
      }
    }
  } finally {
    try {
      client.close();
      console.log("FTP connection closed");
    } catch (closeError) {
      console.error("Error closing FTP connection:", closeError);
    }
  }
};
//file Delete function 

module.exports = {
  multipleUpload,
  getScan,
  getFolderContents,
  createFolder,
  checkFolder,
  FolderContent,
  viewFileFromQNAP,
};
