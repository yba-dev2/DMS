const FolderModel = require("../model/File");
const UserModel = require("../model/users");
const ShareModel = require("../model/share");
const CommitteeGroup = require("../model/Committee");
const CreateFolder = require("../model/folder");
const ftp = require("basic-ftp");
const mime = require("mime-types");
const { PDFDocument } = require("pdf-lib");
const stream = require("stream");
const sendEmail = require("../email/emailConfig");
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
//controller to share files and folders
const shareFilesFolder = async (req, res) => {
  const {
    id,
    access,
    shareWithUserId,
    shareWithGroupId,
    type,
    redirectUrl,
    shareToAll,
  } = req.body;

  const backTo = redirectUrl || "/FolderList";
  const sharerId = req.session.userId;

  try {
    if (!shareToAll && !shareWithUserId && !shareWithGroupId) {
      req.flash(
        "error",
        "Please select a user, group, or choose to share with all."
      );
      return res.redirect(backTo);
    }

    if (!["file", "folder"].includes(type)) {
      req.flash("error", "Invalid share type.");
      return res.redirect(backTo);
    }

    let folder = null;
    let file = null;

    if (type === "folder") {
      folder = await FolderModel.findById(id);
    } else {
      folder = await FolderModel.findOne({ "files._id": id });
      if (folder) {
        file = folder.files.id(id);
      }
    }

    if (!folder || (type === "file" && !file)) {
      req.flash("error", `${type === "folder" ? "Folder" : "File"} not found.`);
      return res.redirect(backTo);
    }

    const uploaderId =
      type === "folder"
        ? folder.uploadedBy?.toString()
        : file.uploadedBy?.toString();

    if (
      !shareToAll &&
      shareWithUserId &&
      shareWithUserId === sharerId &&
      uploaderId === sharerId
    ) {
      req.flash(
        "error",
        `You cannot share the ${type} with yourself as the owner.`
      );
      return res.redirect(backTo);
    }

    const validAccessValues = ["write", "NoDownload"];
    const sanitizedAccess = validAccessValues.includes(access)
      ? access
      : "write";

    let shareDoc = await ShareModel.findOne({
      folderId: type === "folder" ? folder._id : null,
      fileId: type === "file" ? file._id : null,
      sharedBy: sharerId,
    });

    if (!shareDoc) {
      shareDoc = new ShareModel({
        fileId: type === "file" ? file._id : null,
        folderId: type === "folder" ? folder._id : null,
        sharedBy: sharerId,
        sharedWith: [],
        shareToAll: false,
      });
    }

    const sharer = await UserModel.findById(sharerId);
    const sharedItemName = type === "folder" ? folder.name : file.originalname;

    if (shareToAll === "true" || shareToAll === true) {
      if (shareDoc.shareToAll) {
        req.flash(
          "info",
          `${type.charAt(0).toUpperCase() + type.slice(1)} is already shared with everyone.`
        );
        return res.redirect(backTo);
      }

      // OPTIMIZATION 1: Use lean() for faster queries and select only needed fields
      const allUsers = await UserModel.find(
        { _id: { $ne: sharerId } },
        { _id: 1, name: 1, email: 1, department: 1 }
      ).lean();

      // OPTIMIZATION 2: Batch process users efficiently
      const newShares = [];
      const validRecipients = [];

      allUsers.forEach((user) => {
        const alreadyShared = shareDoc.sharedWith.some(
          (entry) => entry.userId?.toString() === user._id.toString()
        );

        if (!alreadyShared) {
          newShares.push({
            userId: user._id,
            access: sanitizedAccess,
            sharedAt: new Date(),
          });

          // Only add users with valid emails to recipients
          if (user.email && user.email.includes("@")) {
            validRecipients.push({
              name: user.name,
              email: user.email,
              department: user.department
            });
          }
        }
      });

      // Batch add all new shares
      shareDoc.sharedWith.push(...newShares);
      shareDoc.shareToAll = true;

      // OPTIMIZATION 3: Save first, then handle emails asynchronously
      shareDoc.markModified("shareToAll");
      await shareDoc.save();

      // Respond immediately to user
      req.flash(
        "success",
        `${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully with all users. Email notifications are being sent in the background.`
      );

      // OPTIMIZATION 4: Handle email notifications asynchronously
      processEmailNotifications(validRecipients, sharer, type, sharedItemName)
        .catch(err => {
          console.error('Background email processing failed:', err);
        });

      return res.redirect(backTo);

    } else if (shareWithUserId || shareWithGroupId) {
      // Handle individual user/group sharing (existing logic)
      const isAlreadyShared = shareDoc.sharedWith?.some((entry) => {
        return (
          (shareWithUserId && entry.userId?.toString() === shareWithUserId) ||
          (shareWithGroupId && entry.groupId?.toString() === shareWithGroupId)
        );
      });

      if (isAlreadyShared) {
        req.flash(
          "info",
          `${type.charAt(0).toUpperCase() + type.slice(1)} is already shared with this user/group.`
        );
        return res.redirect(backTo);
      }

      shareDoc.sharedWith.push({
        ...(shareWithUserId ? { userId: shareWithUserId } : {}),
        ...(shareWithGroupId ? { groupId: shareWithGroupId } : {}),
        access: sanitizedAccess,
        sharedAt: new Date(),
      });

      let recipients = [];

      if (shareWithUserId) {
        const user = await UserModel.findById(shareWithUserId, 'name email department').lean();
        if (user && user.email && user.email.includes("@")) {
          recipients.push({ name: user.name, email: user.email, department: user.department });
        }
      }

      if (shareWithGroupId) {
        const groupUsers = await UserModel.find(
          {
            group: shareWithGroupId,
            _id: { $ne: sharerId },
          },
          'name email department'
        ).lean();

        recipients.push(
          ...groupUsers
            .filter(user => user.email && user.email.includes("@"))
            .map((user) => ({
              name: user.name,
              email: user.email,
              department: user.department
            }))
        );
      }

      shareDoc.markModified("shareToAll");
      await shareDoc.save();

      // For individual/group sharing, send emails immediately since count is small
      await sendEmailNotifications(recipients, sharer, type, sharedItemName, req);
      return res.redirect(backTo);
    }

  } catch (err) {
    console.error('Share operation failed:', err);
    req.flash("error", "An error occurred while sharing. Please try again.");
    return res.redirect(backTo);
  }
};

// OPTIMIZATION 5: Separate function for background email processing
async function processEmailNotifications(recipients, sharer, type, sharedItemName) {
  console.log(`📧 Starting background email processing for ${recipients.length} recipients`);
  
  let emailSuccessCount = 0;
  let emailFailureCount = 0;

  // OPTIMIZATION 6: Process emails in batches with limited concurrency
  const BATCH_SIZE = 10; // Process 10 emails at a time
  const DELAY_BETWEEN_BATCHES = 100; // 100ms delay between batches

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    
    // Process batch concurrently
    const emailPromises = batch.map(async (recipient) => {
      const subject = `New ${type} shared with you`;
      const html = generateEmailHTML(recipient, sharer, type, sharedItemName);

      try {
        await sendEmail(recipient.email, subject, html);
        return { success: true, email: recipient.email };
      } catch (error) {
        console.error(`❌ Failed to send email to ${recipient.email}:`, error.message);
        return { success: false, email: recipient.email, error: error.message };
      }
    });

    // Wait for batch to complete
    const results = await Promise.allSettled(emailPromises);
    
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        if (result.value.success) {
          emailSuccessCount++;
        } else {
          emailFailureCount++;
        }
      } else {
        emailFailureCount++;
        console.error('Promise rejected:', result.reason);
      }
    });

    // Small delay between batches to prevent overwhelming email service
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }

  console.log(`📧 Email processing completed: ${emailSuccessCount} successful, ${emailFailureCount} failed`);
}

// OPTIMIZATION 7: Separate function for immediate email sending (individual/group)
async function sendEmailNotifications(recipients, sharer, type, sharedItemName, req) {
  let emailSuccessCount = 0;
  let emailFailureCount = 0;

  // For small recipient lists, send immediately with Promise.all for speed
  const emailPromises = recipients.map(async (recipient) => {
    const subject = `New ${type} shared with you`;
    const html = generateEmailHTML(recipient, sharer, type, sharedItemName);

    try {
      await sendEmail(recipient.email, subject, html);
      return { success: true };
    } catch (error) {
      console.error(`❌ Failed to send email to ${recipient.email}:`, error.message);
      return { success: false };
    }
  });

  const results = await Promise.allSettled(emailPromises);
  
  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value.success) {
      emailSuccessCount++;
    } else {
      emailFailureCount++;
    }
  });

  // Provide feedback about email sending
  if (emailSuccessCount > 0 && emailFailureCount === 0) {
    req.flash(
      "success",
      `${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully. Email notifications sent to recipients.`
    );
  } else if (emailSuccessCount > 0 && emailFailureCount > 0) {
    req.flash(
      "warning",
      `${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully. ${emailSuccessCount} email(s) sent, ${emailFailureCount} failed.`
    );
  } else if (emailFailureCount > 0) {
    req.flash(
      "success",
      `${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully, but email notifications failed to send.`
    );
  } else {
    req.flash(
      "success",
      `${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully.`
    );
  }
}

// Helper function to generate email HTML
function generateEmailHTML(recipient, sharer, type, sharedItemName) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">File/Folder Sharing Notification</h2>
      <p>Dear ${recipient.name},</p>
      <p>
        <strong>${sharer.name}</strong> from the <strong>${sharer.department}</strong> department 
        (<strong>${sharer.email}</strong>) has shared a ${type} titled 
        <strong>"${sharedItemName}"</strong> with you.
      </p>
      <p>
        You can access the shared item by logging into the ERP system and navigating to the DMS module.
      </p>
      <hr style="border: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        Best regards,<br>
        BIL Document Management System
      </p>
    </div>
  `;
}
// Keep the original controller for backward compatibility
const removeSharedFolder = async (req, res) => {
  const {
    itemId,
    itemType,
    userId,
    groupId,
    selected = [],
    stopShareToAll,
    redirectUrl,
  } = req.body;
  const backTo = decodeURIComponent(redirectUrl || "/FolderList");

  try {
    console.log("Request body:", req.body);

    // Validate base input
    if (!itemId || !itemType) {
      req.flash("error", "Invalid request parameters");
      return res.redirect(backTo);
    }

    // Prepare query for ShareModel
    const query =
      itemType === "folder"
        ? { folderId: itemId }
        : itemType === "file"
        ? { fileId: itemId }
        : null;

    if (!query) {
      req.flash("error", "Invalid item type");
      return res.redirect(backTo);
    }

    // FIXED: Handle bulk operations (selected array exists)
    if (Array.isArray(selected) && selected.length > 0) {
      console.log("DEBUG: Processing bulk operation");

      // Remove selected users/groups
      const pullConditions = selected
        .map((id) => {
          const [type, val] = id.split("-");
          return type === "user"
            ? { userId: val }
            : type === "group"
            ? { groupId: val }
            : null;
        })
        .filter(Boolean);

      for (const cond of pullConditions) {
        await ShareModel.updateOne(query, { $pull: { sharedWith: cond } });
      }

      // ALSO handle stopShareToAll if it's set during bulk operations
      if (stopShareToAll === "true" || stopShareToAll === true) {
        await ShareModel.findOneAndUpdate(
          query,
          {
            $set: { shareToAll: false },
          },
          { upsert: true }
        );
      }

      // Check if the doc should be deleted
      const updatedDoc = await ShareModel.findOne(query);
      if (
        updatedDoc &&
        updatedDoc.sharedWith.length === 0 &&
        updatedDoc.shareToAll !== true
      ) {
        await ShareModel.deleteOne(query);
      }

      req.flash("success", "Access removed successfully.");
      return res.redirect(backTo);
    }

    // Handle ONLY stopShareToAll (no selected users)
    if (stopShareToAll === "true" || stopShareToAll === true) {
      console.log("DEBUG: Processing stopShareToAll only");

      await ShareModel.findOneAndUpdate(
        query,
        {
          $set: { shareToAll: false },
        },
        { upsert: true }
      );

      req.flash("success", "Stopped sharing with everyone.");
      return res.redirect(backTo);
    }

    // Handle individual user or group removal (legacy - probably not used with your current frontend)
    if (userId || groupId) {
      console.log("DEBUG: Processing individual removal");

      const pullCondition = userId ? { userId: userId } : { groupId: groupId };

      await ShareModel.updateOne(query, {
        $pull: { sharedWith: pullCondition },
      });

      const updatedShare = await ShareModel.findOne(query);
      if (
        updatedShare &&
        updatedShare.sharedWith.length === 0 &&
        !updatedShare.shareToAll
      ) {
        await ShareModel.deleteOne(query);
      }

      req.flash("success", "Sharing access removed successfully");
      return res.redirect(backTo);
    }

    // If we reach here, invalid request
    req.flash("error", "Invalid request parameters");
    return res.redirect(backTo);
  } catch (err) {
    console.error("Error removing shared access:", err);
    req.flash("error", "Server error occurred while removing access");
    return res.redirect(backTo);
  }
};

//function to get the user details of shared file and folder
const shareUserDetails = async (req, res) => {
  const { type, id } = req.params;

  try {
    let shareDoc;

    if (type === "folder") {
      shareDoc = await ShareModel.findOne({ folderId: id }).lean();
    } else if (type === "file") {
      shareDoc = await ShareModel.findOne({ fileId: id }).lean();
    } else {
      return res.status(400).json({ success: false, message: "Invalid type" });
    }

    if (!shareDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Share data not found" });
    }

    const userIds = shareDoc.sharedWith
      .filter((entry) => entry.userId)
      .map((entry) => entry.userId);

    const groupIds = shareDoc.sharedWith
      .filter((entry) => entry.groupId)
      .map((entry) => entry.groupId);

    const users = await UserModel.find({ _id: { $in: userIds } }).select(
      "name department"
    );
    const groups = await CommitteeGroup.find({ _id: { $in: groupIds } }).select(
      "groupName"
    );

    const sharedWith = shareDoc.sharedWith.map((entry) => {
      const user = users.find((u) => u._id.equals(entry.userId));
      const group = groups.find((g) => g._id.equals(entry.groupId));

      return {
        user: user || null,
        group: group || null,
        access: entry.access,
        sharedAt: entry.sharedAt,
      };
    });

    return res.json({ success: true, sharedWith });
  } catch (err) {
    console.error("Error in shareUserDetails:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
//controller to get all shared folders and files with the user
const getSharedWithMeFolders = async (req, res) => {
  try {
    const user = req.session.userId?.toString();

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const shares = await ShareModel.find({})
      .populate("sharedBy", "name email")
      .populate("sharedWith.userId", "name email")
      .populate("sharedWith.groupId", "groupName members")
      .lean();

    const sharedItems = [];

    for (const share of shares) {
      // ❌ Skip if no sharedBy or sharedWith is empty
      if (
        !share.sharedBy ||
        !Array.isArray(share.sharedWith) ||
        share.sharedWith.length === 0
      ) {
        continue;
      }

      const isFolder = !!share.folderId;
      const isFile = !!share.fileId;

      let itemData = null;
      let type = null;

      if (isFolder) {
        itemData = await FolderModel.findById(share.folderId).lean();
        type = "folder";
      } else if (isFile) {
        itemData = await FolderModel.findOne(
          { "files._id": share.fileId },
          { "files.$": 1, folderName: 1, createdBy: 1, department: 1 }
        )
          .populate("uploadedBy", "name")
          .lean();

        if (itemData?.files?.length > 0) {
          itemData = {
            ...itemData.files[0],
            folderName: itemData.folderName,
            parentId: itemData._id,
          };
          type = "file";
        }
      }

      if (!itemData) continue;

      // Check if the logged-in user is shared WITH (directly or group member)
      const sharedToUser = share.sharedWith.some((sw) => {
        const sharedWithUser = sw.userId?._id?.toString() === user;

        const sharedWithGroupMember =
          sw.groupId &&
          Array.isArray(sw.groupId.members) &&
          sw.groupId.members.map((m) => m.toString()).includes(user);

        return sharedWithUser || sharedWithGroupMember;
      });

      // Check if logged-in user is the one who shared this
      const sharedByUser = share.sharedBy?._id?.toString() === user;

      // Show the item only if user is either the sharer or a recipient
      if (sharedToUser || sharedByUser) {
        let sharedWith = [];

        if (sharedByUser) {
          // Sharer sees all sharedWith entries
          sharedWith = share.sharedWith.map((sw) => {
            let recipient = "Unknown";
            if (sw.groupId && sw.groupId.groupName) {
              recipient = `${sw.groupId.groupName} (Group)`;
            } else if (sw.userId && sw.userId.name) {
              recipient = sw.userId.name;
            }
            return {
              to: recipient,
              access: sw.access,
              sharedAt: sw.sharedAt,
            };
          });
        } else {
          // Recipients see only their relevant shares
          sharedWith = share.sharedWith
            .filter((sw) => {
              const isUser = sw.userId?._id?.toString() === user;
              const isGroupMember =
                sw.groupId &&
                Array.isArray(sw.groupId.members) &&
                sw.groupId.members.map((m) => m.toString()).includes(user);
              return isUser || isGroupMember;
            })
            .map((sw) => {
              let recipient = "Unknown";
              if (sw.groupId && sw.groupId.groupName) {
                recipient = `${sw.groupId.groupName} (Group)`;
              } else if (sw.userId && sw.userId.name) {
                recipient = sw.userId.name;
              }
              return {
                to: recipient,
                access: sw.access,
                sharedAt: sw.sharedAt,
              };
            });
        }

        sharedItems.push({
          _id: isFolder ? share.folderId : share.fileId,
          name: isFolder
            ? itemData.folderName
            : itemData.originalname || "Unnamed File",
          type,
          sharedBy: share.sharedBy?.name || "Unknown",
          sharedWith,
          parentId: isFile ? itemData.parentId : null,
        });
      }
    }

    res.render("sharing", {
      sharedItems,
      message:
        sharedItems.length === 0
          ? "No files or folders shared with you or shared by you."
          : null,
      user,
      getFileIcon,
    });
  } catch (err) {
    console.error("Error in getSharedWithMeFolders:", err);
    res.status(500).send("Server Error");
  }
};

//View the share file
const ShareFilesView = async (req, res) => {
  const fileId = req.params.fileId;
  const loggedInUserId = req.session.userId;
  const client = new ftp.Client();

  try {
    const user = await UserModel.findById(loggedInUserId);
    if (!user) return res.status(404).send("User not found");

    const folder = await FolderModel.findOne({ "files._id": fileId }).populate(
      "linkedFolder"
    );
    if (!folder) return res.status(404).send("File not found");

    const file = folder.files.id(fileId);
    if (!file) return res.status(404).send("File not found");

    const folderPath = folder.linkedFolder?.path;
    const folderDept = folder.linkedFolder?.department;

    if (!folderPath || !folderDept)
      return res.status(500).send("Folder path/department missing");

    const ftpConfig = ftpCredentials[folderDept];
    if (!ftpConfig)
      return res
        .status(404)
        .send(`FTP config missing for department: ${folderDept}`);

    const remoteFilePath = `/${folderPath}/${file.originalname}`;
    const mimeType =
      mime.lookup(file.originalname) || "application/octet-stream";

    const share = await ShareModel.findOne({
      file: fileId,
      sharedTo: loggedInUserId,
    });

    const accessLevel = share?.access || "write";

    // **SECURITY HEADERS FOR HTTPS**
    // Set security headers before any response
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // **CORS HEADERS FOR HTTPS**
    // Allow cross-origin requests for HTTPS
    const origin = req.headers.origin;
    if (origin && (origin.includes('https://') || origin.includes('http://localhost'))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    // **CACHE HEADERS FOR PDFs**
    if (mimeType === "application/pdf") {
      // Set cache headers for better performance
      res.setHeader('Cache-Control', 'private, max-age=3600'); // 1 hour cache
      res.setHeader('ETag', `"${fileId}-${Date.now()}"`);
    }

    // FTP download
    await client.access(ftpConfig);

    const writableStream = new stream.PassThrough();
    const fileBufferPromise = new Promise((resolve, reject) => {
      const chunks = [];
      writableStream.on("data", (chunk) => chunks.push(chunk));
      writableStream.on("end", () => resolve(Buffer.concat(chunks)));
      writableStream.on("error", reject);
    });

    await client.downloadTo(writableStream, remoteFilePath);
    const fileBuffer = await fileBufferPromise;

    if (mimeType === "application/pdf") {
      try {
        const pdfDoc = await PDFDocument.load(fileBuffer, {
          ignoreEncryption: true,
        });
        const newPdfDoc = await PDFDocument.create();
        const pages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach((page) => newPdfDoc.addPage(page));
        const newBuffer = await newPdfDoc.save();

        // **ENHANCED PDF HEADERS FOR HTTPS**
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", newBuffer.length);
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${encodeURIComponent(file.originalname)}"`
        );
        
        // **SECURITY HEADERS SPECIFIC TO PDF**
        res.setHeader('Content-Security-Policy', "default-src 'self'; object-src 'none';");
        
        return res.send(Buffer.from(newBuffer));
      } catch (pdfError) {
        console.error("PDF processing error:", pdfError);
        // Fallback: serve original PDF if processing fails
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", fileBuffer.length);
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${encodeURIComponent(file.originalname)}"`
        );
        return res.send(fileBuffer);
      }
    }

    // For non-PDFs
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", fileBuffer.length);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(file.originalname)}"`
    );

    if (accessLevel === "NoDownload") {
      return res
        .status(403)
        .send("You do not have permission to download this file.");
    }

    return res.send(fileBuffer);
  } catch (err) {
    console.error("Error:", err);
    
    // **ENHANCED ERROR HANDLING FOR HTTPS**
    if (!res.headersSent) {
      // Set error headers
      res.setHeader('Content-Type', 'application/json');
      
      // Provide more specific error information
      if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({ 
          error: 'Service temporarily unavailable',
          message: 'FTP server connection failed'
        });
      } else if (err.code === 'ENOTFOUND') {
        return res.status(404).json({ 
          error: 'File not found',
          message: 'The requested file could not be located'
        });
      } else {
        return res.status(500).json({ 
          error: 'Internal Server Error',
          message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
        });
      }
    }
  } finally {
    client.close();
  }
};

//based on share access level, return the file or folder

module.exports = {
  shareFilesFolder,
  getSharedWithMeFolders,
  removeSharedFolder,
  shareUserDetails,
  ShareFilesView,
};
