const express = require("express");

const previewUser = {
  id: 1,
  employeeId: "BIL/2024/E0001",
  employeeCode: "20240101001",
  name: "Preview User",
  email: "preview.user@bil.bt",
  department: "Information Technology"
};

const dashboardData = {
  user: previewUser,
  stats: {
    totalFiles: 128,
    totalFolders: 24,
    sharedFiles: 17,
    sharedFolders: 6
  },
  storage: {
    size: "1TB",
    used: "380MB",
    avail: "620GB",
    usePercent: "38%",
    displayName: "Preview Storage"
  }
};

const previewUsers = [
  previewUser,
  { id: 2, name: "Sonam Wangmo", department: "Finance" },
  { id: 3, name: "Karma Dorji", department: "Human Resources" },
  { id: 4, name: "Pema Choden", department: "Information Technology" }
];

const previewFolders = [
  { id: 101, folderName: "Policies", path: "/Policies", department: "Information Technology", createdAt: new Date("2026-07-12"), creator: previewUser },
  { id: 102, folderName: "Project Reports", path: "/Project Reports", department: "Information Technology", createdAt: new Date("2026-08-03"), creator: previewUser },
  { id: 103, folderName: "Meeting Minutes", path: "/Meeting Minutes", department: "Information Technology", createdAt: new Date("2026-08-18"), creator: previewUser }
];

const previewFiles = [
  { id: 201, folderId: 101, filename: "Information-Security-Policy.pdf", originalname: "Information Security Policy.pdf", mimetype: "application/pdf", size: 2480000, date: new Date("2026-07-14"), uploader: previewUser },
  { id: 202, folderId: 102, filename: "DMS-Progress-Report.docx", originalname: "DMS Progress Report.docx", mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: 786000, date: new Date("2026-08-05"), uploader: previewUser },
  { id: 203, folderId: 103, filename: "ICT-Meeting-Minutes.pdf", originalname: "ICT Meeting Minutes.pdf", mimetype: "application/pdf", size: 1130000, date: new Date("2026-08-19"), uploader: previewUsers[3] }
];

const previewGroups = [
  { id: 301, groupName: "DMS Working Group", secretary: previewUser, members: [previewUser, previewUsers[3]] },
  { id: 302, groupName: "Policy Review Committee", secretary: previewUsers[2], members: [previewUsers[1], previewUsers[2], previewUser] }
];

const previewSharedItems = [
  {
    _id: 201,
    name: "Information Security Policy.pdf",
    filename: "Information-Security-Policy.pdf",
    mimetype: "application/pdf",
    type: "file",
    sharedBy: "Sonam Wangmo",
    sharedWith: [
      { to: "Preview User", access: "write", sharedAt: "2026-08-20T09:30:00Z" },
      { to: "DMS Working Group (Group)", access: "NoDownload", sharedAt: "2026-08-21T04:15:00Z" }
    ]
  },
  {
    _id: 102,
    name: "Project Reports",
    type: "folder",
    sharedBy: "Preview User",
    sharedWith: [
      { to: "Policy Review Committee (Group)", access: "write", sharedAt: "2026-08-22T07:00:00Z" }
    ]
  }
];

const getFileIcon = (fileName = "") => {
  const extension = fileName.split(".").pop().toLowerCase();
  if (extension === "pdf") return "solar:file-text-bold";
  if (["doc", "docx"].includes(extension)) return "solar:document-text-bold";
  if (["xls", "xlsx"].includes(extension)) return "solar:chart-square-bold";
  return "solar:file-bold";
};

const formatFileSize = (bytes = 0) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** unit)).toFixed(unit ? 1 : 0)} ${units[unit]}`;
};

module.exports = (app) => {
  const router = express.Router();

  router.use((req, res, next) => {
    res.locals.messages = {};
    next();
  });

  router.get(["/", "/welcome"], (req, res) => {
    res.render("index.ejs", dashboardData);
  });

  router.get("/Uploads", (req, res) => {
    res.render("welcome.ejs", {
      user: previewUser,
      currentPath: "/",
      messages: {
        success: "UI preview mode: uploads are disabled."
      }
    });
  });

  router.get("/profile", (req, res) => {
    res.render("profile.ejs", { user: previewUser });
  });

  router.get("/FolderList", (req, res) => {
    res.render("viewCreatedFolder.ejs", {
      user: previewUser,
      folders: previewFolders,
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      loggedInUserId: previewUser.id
    });
  });

  router.get("/FolderContent/:id", (req, res) => {
    const folder = previewFolders.find((item) => String(item.id) === req.params.id) || previewFolders[0];
    res.render("eachFiles.ejs", {
      user: previewUser,
      folder: { ...folder, files: previewFiles.filter((file) => file.folderId === folder.id) },
      formatFileSize,
      getFileIcon,
      currentPage: 1,
      totalPages: 1
    });
  });

  router.get("/sharing", (req, res) => {
    res.render("sharing.ejs", {
      user: previewUser,
      sharedItems: previewSharedItems,
      currentPage: 1,
      totalPages: 1,
      message: null,
      getFileIcon
    });
  });

  router.get("/DeepSearch", (req, res) => {
    const keyword = String(req.query.keyword || "").trim().toLowerCase();
    const searchableItems = [
      ...previewFolders.map((folder) => ({ _id: folder.id, type: "folder", name: folder.folderName, date: folder.createdAt, uploadedBy: folder.creator.name, department: folder.department })),
      ...previewFiles.map((file) => ({ _id: file.id, type: "file", name: file.originalname || file.filename, filename: file.filename, date: file.date, uploadedBy: file.uploader.name, department: file.uploader.department }))
    ];
    const matches = keyword
      ? searchableItems.filter((item) => `${item.name} ${item.type} ${item.uploadedBy} ${item.department}`.toLowerCase().includes(keyword))
      : [];

    res.render("DeepSearch.ejs", { user: previewUser, keyword: req.query.keyword || "", matches });
  });

  router.get("/ViewGroups", (req, res) => {
    res.render("ViewGroups.ejs", {
      user: previewUser,
      groups: previewGroups,
      allUsers: previewUsers,
      currentUserId: previewUser.id,
      currentPage: 1,
      totalPages: 1,
      limit: 3
    });
  });

  router.get(["/AddGroups", "/addGroups"], (req, res) => {
    res.render("Committe.ejs", { user: previewUser, allUsers: previewUsers, message: null });
  });

  router.all(["/multiple-upload", "/create-folder", "/AddGroup", "/deleteGroup/:id", "/view/:id", "/shared-files/:id", "/files/:id"], (req, res) => {
    res.status(503).json({ error: "This action is disabled in UI preview mode." });
  });

  router.get("/logout", (req, res) => {
    res.redirect("/welcome");
  });

  app.use("/", router);
};
