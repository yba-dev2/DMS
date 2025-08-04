const {
  User,
  File,
  Folder,
  CreateFolder,
  Share,
  SharedWith,
  CommitteeGroup,
  DownloadedBy,
} = require("../config/dbConnector");
const ftp = require("basic-ftp");
const mime = require("mime-types");
const { PDFDocument } = require("pdf-lib");
const stream = require("stream");
const sendEmail = require("../email/emailConfig");
const { Sequelize } = require("sequelize");
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

    // Find the folder or file
    let folder = null;
    let file = null;

    if (type === "folder") {
      folder = await Folder.findByPk(id);
    } else {
      file = await File.findByPk(id);
      if (file) {
        folder = await Folder.findByPk(file.folderId); // Assuming File has folderId FK
      }
    }

    if (!folder || (type === "file" && !file)) {
      req.flash("error", `${type} not found.`);
      return res.redirect(backTo);
    }

    const uploaderId = type === "folder" ? folder.uploadedBy : file.uploadedBy;
    if (
      !shareToAll &&
      shareWithUserId &&
      parseInt(shareWithUserId) === sharerId &&
      uploaderId === sharerId
    ) {
      req.flash(
        "error",
        `You cannot share the ${type} with yourself as the owner.`
      );
      return res.redirect(backTo);
    }

    const sanitizedAccess = ["write", "NoDownload"].includes(access)
      ? access
      : "write";

    // Check if a Share entry already exists
    let shareDoc = await Share.findOne({
      where: {
        sharedBy: sharerId,
        fileId: type === "file" ? file.id : null,
        folderId: type === "folder" ? folder.id : null,
      },
    });

    if (!shareDoc) {
      shareDoc = await Share.create({
        sharedBy: sharerId,
        fileId: type === "file" ? file.id : null,
        folderId: type === "folder" ? folder.id : null,
        shareToAll: false,
      });
    }

    const sharedItemName = type === "folder" ? folder.name : file.filename;

    // Get sharer details for email notifications
    const sharer = await User.findByPk(sharerId, {
      attributes: ["id", "name", "email", "department"],
    });

    if (shareToAll === "true" || shareToAll === true) {
      if (shareDoc.shareToAll) {
        req.flash("info", `${type} is already shared with all users.`);
        return res.redirect(backTo);
      }

      const allUsers = await User.findAll({
        where: { id: { [Op.ne]: sharerId } },
        attributes: ["id", "name", "email", "department"],
      });

      const sharedWithEntries = await SharedWith.findAll({
        where: { shareId: shareDoc.id },
      });

      const sharedUserIds = sharedWithEntries.map((entry) => entry.userId);

      const newEntries = allUsers
        .filter((user) => !sharedUserIds.includes(user.id))
        .map((user) => ({
          shareId: shareDoc.id,
          userId: user.id,
          access: sanitizedAccess,
          sharedAt: new Date(),
        }));

      await SharedWith.bulkCreate(newEntries);
      await shareDoc.update({ shareToAll: true });

      // Send emails in background for "share to all" scenario
      const newRecipients = allUsers.filter(
        (user) => !sharedUserIds.includes(user.id)
      );
      if (newRecipients.length > 0) {
        // Don't wait for email processing - run in background
        processEmailNotifications(
          newRecipients,
          sharer,
          type,
          sharedItemName
        ).catch((error) => {
          console.error("Background email processing failed:", error);
        });
      }

      req.flash("success", `${type} shared with all users.`);
      return res.redirect(backTo);
    }

    // Share with a single user or group
    const isAlreadyShared = await SharedWith.findOne({
      where: {
        shareId: shareDoc.id,
        ...(shareWithUserId && { userId: shareWithUserId }),
        ...(shareWithGroupId && { groupId: shareWithGroupId }),
      },
    });

    if (isAlreadyShared) {
      req.flash("info", `${type} is already shared with this user/group.`);
      return res.redirect(backTo);
    }

    await SharedWith.create({
      shareId: shareDoc.id,
      userId: shareWithUserId || null,
      groupId: shareWithGroupId || null,
      access: sanitizedAccess,
      sharedAt: new Date(),
    });

    // Prepare recipients for email notifications
    let recipients = [];

    if (shareWithUserId) {
      // Share with individual user
      const user = await User.findByPk(shareWithUserId, {
        attributes: ["id", "name", "email", "department"],
      });
      if (user) {
        recipients.push(user);
      }
    }

    if (shareWithGroupId) {
      // Share with group - get all group members
      const groupMembers = await User.findAll({
        attributes: ["id", "name", "email", "department"],
        include: [
          {
            model: UserGroup, // Assuming you have a UserGroup junction table
            where: { groupId: shareWithGroupId },
            attributes: [],
          },
        ],
      });
      recipients = recipients.concat(groupMembers);
    }

    // Send email notifications immediately for individual/group sharing
    if (recipients.length > 0) {
      // For small recipient lists (individual/group), send immediately
      sendEmailNotifications(
        recipients,
        sharer,
        type,
        sharedItemName,
        req
      ).catch((error) => {
        console.error("Email notification failed:", error);
        // Don't change the success message as the share operation succeeded
      });
    } else {
      req.flash("success", `${type} shared successfully.`);
    }

    return res.redirect(backTo);
  } catch (error) {
    console.error("Error in shareFilesFolder:", error);
    req.flash("error", "An error occurred while sharing.");
    return res.redirect(backTo);
  }
};

// OPTIMIZATION 5: Separate function for background email processing
async function processEmailNotifications(
  recipients,
  sharer,
  type,
  sharedItemName
) {
  console.log(
    `📧 Starting background email processing for ${recipients.length} recipients`
  );

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
        console.error(
          `❌ Failed to send email to ${recipient.email}:`,
          error.message
        );
        return { success: false, email: recipient.email, error: error.message };
      }
    });

    // Wait for batch to complete
    const results = await Promise.allSettled(emailPromises);

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        if (result.value.success) {
          emailSuccessCount++;
        } else {
          emailFailureCount++;
        }
      } else {
        emailFailureCount++;
        console.error("Promise rejected:", result.reason);
      }
    });

    // Small delay between batches to prevent overwhelming email service
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((resolve) =>
        setTimeout(resolve, DELAY_BETWEEN_BATCHES)
      );
    }
  }

  console.log(
    `📧 Email processing completed: ${emailSuccessCount} successful, ${emailFailureCount} failed`
  );
}

// OPTIMIZATION 7: Separate function for immediate email sending (individual/group)
async function sendEmailNotifications(
  recipients,
  sharer,
  type,
  sharedItemName,
  req
) {
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
      console.error(
        `❌ Failed to send email to ${recipient.email}:`,
        error.message
      );
      return { success: false };
    }
  });

  const results = await Promise.allSettled(emailPromises);

  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value.success) {
      emailSuccessCount++;
    } else {
      emailFailureCount++;
    }
  });

  // Provide feedback about email sending
  if (emailSuccessCount > 0 && emailFailureCount === 0) {
    req.flash(
      "success",
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } shared successfully. Email notifications sent to recipients.`
    );
  } else if (emailSuccessCount > 0 && emailFailureCount > 0) {
    req.flash(
      "warning",
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } shared successfully. ${emailSuccessCount} email(s) sent, ${emailFailureCount} failed.`
    );
  } else if (emailFailureCount > 0) {
    req.flash(
      "success",
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } shared successfully, but email notifications failed to send.`
    );
  } else {
    req.flash(
      "success",
      `${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully.`
    );
  }
}

// Email HTML generation function (you may need to customize this)
function generateEmailHTML(recipient, sharer, type, sharedItemName) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">File/Folder Sharing Notification</h2>

  <p>Hello ${recipient.name},</p>

  <p><strong>${sharer.name}</strong> from the <strong>${sharer.department}</strong> department has shared a ${type} with you:</p>

  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
    <h3 style="margin: 0; color: #555;">${sharedItemName}</h3>
  </div>

  <p>You can access the shared ${type} by logging into the ERP System and navigating to the DMS module.</p>

  <p>Best regards,</p>
  <p>Bil Document Management System</p>

  <p style="color: #666; font-size: 12px;">
    This is an automated message. Please do not reply to this email.
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
    // Validate base input
    if (!itemId || !itemType) {
      req.flash(
        "error",
        "Invalid request parameters: Missing itemId or itemType"
      );
      return res.redirect(backTo);
    }

    // Build base query for Share model based on itemType
    let query = {};
    if (itemType === "folder") {
      query = { folderId: Number(itemId) };
    } else if (itemType === "file") {
      query = { fileId: Number(itemId) };
    } else {
      req.flash("error", "Invalid item type");
      return res.redirect(backTo);
    }

    console.log("Share model query:", query);
    console.log("Request body:", req.body);

    // Helper: find share entry for given query
    const findShare = async () => {
      return await Share.findOne({ where: query });
    };

    // Helper: update share entry by id
    const updateShare = async (id, updateObj) => {
      try {
        const result = await Share.update(updateObj, { where: { id } });
        console.log(`Sequelize update result for share ${id}:`, result);
        return result;
      } catch (error) {
        console.error("Sequelize update failed, trying raw SQL:", error);

        // Fallback to raw SQL if Sequelize update fails
        if (updateObj.shareToAll !== undefined) {
          const { QueryTypes } = require("sequelize");
          const rawResult = await sequelize.query(
            "UPDATE shares SET share_to_all = ? WHERE id = ?",
            {
              replacements: [updateObj.shareToAll ? 1 : 0, id],
              type: QueryTypes.UPDATE,
            }
          );
          console.log("Raw SQL update result:", rawResult);
          return rawResult;
        }
        throw error;
      }
    };

    // Helper: destroy share entry by id
    const destroyShare = async (id) => {
      return await Share.destroy({ where: { id } });
    };

    // Helper: remove SharedWith entries
    const removeSharedWithEntries = async (shareId, conditions) => {
      const { Op } = require("sequelize");
      const whereClause = { shareId: shareId };

      // Add user/group conditions using OR
      if (conditions.length > 0) {
        whereClause[Op.or] = conditions;
      }

      return await SharedWith.destroy({ where: whereClause });
    };

    // Helper: remove individual SharedWith entry
    const removeIndividualSharedWith = async (shareId, condition) => {
      const whereClause = {
        shareId: shareId,
        ...condition,
      };
      return await SharedWith.destroy({ where: whereClause });
    };

    // Get the current share entry
    const shareEntry = await findShare();
    if (!shareEntry) {
      req.flash("error", "No sharing entry found");
      return res.redirect(backTo);
    }

    console.log("Found share entry:", {
      id: shareEntry.id,
      shareToAll: shareEntry.shareToAll,
    });

    // --- Handle stopShareToAll FIRST (most important case) ---
    if (stopShareToAll === "true" || stopShareToAll === true) {
      console.log("Processing stopShareToAll request");

      // If we have selected users/groups, remove them from SharedWith table
      if (Array.isArray(selected) && selected.length > 0) {
        console.log("Also removing selected users/groups:", selected);

        // Parse selected IDs into conditions for SharedWith table
        const removeConditions = selected
          .map((id) => {
            const [type, val] = id.split("-");
            if (!val || val === "undefined") {
              console.warn("Skipping invalid selected ID:", id);
              return null;
            }
            const numericVal = Number(val);
            if (isNaN(numericVal)) {
              console.warn("Skipping non-numeric selected ID value:", val);
              return null;
            }
            if (type === "user") return { userId: numericVal };
            if (type === "group") return { groupId: numericVal };
            return null;
          })
          .filter(Boolean);

        // Remove selected users/groups from SharedWith table
        if (removeConditions.length > 0) {
          await removeSharedWithEntries(shareEntry.id, removeConditions);
          console.log("Removed selected users/groups from SharedWith table");
        }
      }

      // Update the Share entry - set shareToAll to false (0 in database)
      const updateResult = await updateShare(shareEntry.id, {
        shareToAll: false,
      });

      console.log("Update result:", updateResult);
      console.log("Updated share entry - shareToAll set to false");

      // Verify the update by fetching the record again
      const updatedShareEntry = await Share.findOne({
        where: { id: shareEntry.id },
      });
      console.log(
        "Verified updated shareToAll value:",
        updatedShareEntry?.shareToAll
      );

      // Check if we should delete the entire share record
      const remainingSharedWith = await SharedWith.count({
        where: { shareId: shareEntry.id },
      });

      if (remainingSharedWith === 0) {
        console.log("No remaining SharedWith entries, deleting Share record");
        await destroyShare(shareEntry.id);
      }

      req.flash("success", "Successfully stopped sharing with everyone.");
      return res.redirect(backTo);
    }

    // --- Bulk removal of selected users/groups (without stopping shareToAll) ---
    if (Array.isArray(selected) && selected.length > 0) {
      console.log("Processing bulk removal of selected users/groups");
      console.log("Selected items:", selected);

      // Parse selected IDs into conditions for SharedWith table
      const removeConditions = selected
        .map((id) => {
          const [type, val] = id.split("-");
          if (!val || val === "undefined") {
            console.warn("Skipping invalid selected ID:", id);
            return null;
          }
          const numericVal = Number(val);
          if (isNaN(numericVal)) {
            console.warn("Skipping non-numeric selected ID value:", val);
            return null;
          }
          if (type === "user") return { userId: numericVal };
          if (type === "group") return { groupId: numericVal };
          return null;
        })
        .filter(Boolean);

      console.log("Remove conditions for SharedWith table:", removeConditions);

      // Remove selected users/groups from SharedWith table
      if (removeConditions.length > 0) {
        await removeSharedWithEntries(shareEntry.id, removeConditions);
        console.log("Removed selected entries from SharedWith table");
      }

      // Check if we should delete the entire share record
      const remainingSharedWith = await SharedWith.count({
        where: { shareId: shareEntry.id },
      });

      if (remainingSharedWith === 0 && shareEntry.shareToAll !== true) {
        console.log(
          "Deleting Share record as no SharedWith entries remain and shareToAll is false"
        );
        await destroyShare(shareEntry.id);
      }

      req.flash("success", "Selected sharing access removed successfully.");
      return res.redirect(backTo);
    }

    // --- Handle individual user or group removal ---
    if (userId || groupId) {
      console.log("Processing individual removal");
      console.log("userId:", userId, "groupId:", groupId);

      let removeCondition = null;

      if (userId !== undefined && userId !== null && userId !== "undefined") {
        const numericUserId = Number(userId);
        if (isNaN(numericUserId)) {
          req.flash("error", "Invalid userId");
          return res.redirect(backTo);
        }
        removeCondition = { userId: numericUserId };
      } else if (
        groupId !== undefined &&
        groupId !== null &&
        groupId !== "undefined"
      ) {
        const numericGroupId = Number(groupId);
        if (isNaN(numericGroupId)) {
          req.flash("error", "Invalid groupId");
          return res.redirect(backTo);
        }
        removeCondition = { groupId: numericGroupId };
      } else {
        req.flash("error", "No valid userId or groupId provided");
        return res.redirect(backTo);
      }

      // Remove user/group from SharedWith table
      await removeIndividualSharedWith(shareEntry.id, removeCondition);
      console.log("Removed individual entry from SharedWith table");

      // Check if we should delete the entire share record
      const remainingSharedWith = await SharedWith.count({
        where: { shareId: shareEntry.id },
      });

      if (remainingSharedWith === 0 && shareEntry.shareToAll !== true) {
        console.log(
          "Deleting Share record as no SharedWith entries remain and shareToAll is false"
        );
        await destroyShare(shareEntry.id);
      }

      req.flash("success", "Sharing access removed successfully");
      return res.redirect(backTo);
    }

    // Invalid fallback
    console.log("No valid operation found in request");
    req.flash(
      "error",
      "Invalid request parameters - no valid operation specified"
    );
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
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    let shareDoc;

    if (type === "folder") {
      shareDoc = await Share.findOne({
        where: { folderId: numericId },
        include: [
          {
            model: SharedWith,
            as: "sharedWith",
          },
        ],
      });
    } else if (type === "file") {
      shareDoc = await Share.findOne({
        where: { fileId: numericId },
        include: [
          {
            model: SharedWith,
            as: "sharedWith",
          },
        ],
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid type" });
    }

    if (!shareDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Share data not found" });
    }
    const sharedWithEntries = shareDoc.sharedWith || [];

    const userIds = sharedWithEntries
      .filter((e) => e.userId)
      .map((e) => e.userId);
    const groupIds = sharedWithEntries
      .filter((e) => e.groupId)
      .map((e) => e.groupId);

    const users =
      userIds.length > 0
        ? await User.findAll({
            where: { id: { [Op.in]: userIds } },
            attributes: ["id", "name", "department"],
          })
        : [];

    const groups =
      groupIds.length > 0
        ? await CommitteeGroup.findAll({
            where: { id: { [Op.in]: groupIds } },
            attributes: ["id", "groupName"],
          })
        : [];

    const sharedWith = sharedWithEntries.map((entry) => {
      const user = users.find((u) => u.id === entry.userId) || null;
      const group = groups.find((g) => g.id === entry.groupId) || null;
      return {
        user,
        group,
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
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).send("Unauthorized");
    }

    const shares = await Share.findAll({
      include: [
        {
          model: User,
          as: "sharer",
          attributes: ["id", "name", "email"],
        },
        {
          model: SharedWith,
          as: "sharedWith",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "email"],
            },
            {
              model: CommitteeGroup, // or whatever your group model is called
              as: "group",
              attributes: ["id", "groupName"],
              include: [
                {
                  model: User,
                  as: "members", // make sure this alias matches your association
                  attributes: ["id", "name", "email"],
                  through: { attributes: [] }, // hide join table if using many-to-many
                },
              ],
            },
          ],
        },
        {
          model: File,
          as: "file",
        },
        {
          model: Folder,
          as: "folder",
        },
      ],
    });

    const sharedItems = [];

    for (const share of shares) {
      const isFolder = !!share.folderId;
      const isFile = !!share.fileId;

      let itemData = null;
      let type = null;

      if (isFolder && share.folder) {
        itemData = share.folder;
        type = "folder";
      } else if (isFile && share.file) {
        itemData = {
          ...share.file.dataValues,
          folderName: share.file.folderName,
          parentId: share.file.folderId,
        };
        type = "file";
      }

      if (!itemData) continue;

      const sharedToUser = share.sharedWith.some((sw) => {
        const direct = sw.user?.id === userId;
        const inGroup =
          sw.group &&
          sw.group.members &&
          sw.group.members.some((member) => member.id === userId);
        return direct || inGroup;
      });

      const sharedByUser = share.sharer?.id === userId;

      if (sharedToUser || sharedByUser) {
        const sharedWith = share.sharedWith
          .filter((sw) => {
            if (sharedByUser) return true;
            const isUser = sw.user?.id === userId;
            const isGroupMember =
              sw.group &&
              sw.group.members &&
              sw.group.members.some((member) => member.id === userId);
            return isUser || isGroupMember;
          })
          .map((sw) => {
            const to = sw.group
              ? `${sw.group.groupName} (Group)`
              : sw.user?.name || "Unknown";

            return {
              to,
              access: sw.access,
              sharedAt: sw.sharedAt,
            };
          });

        sharedItems.push({
          _id: isFolder ? share.folderId : share.fileId,
          name: isFolder
            ? itemData.folderName
            : itemData.filename || itemData.filename || "Unnamed File",
          type,
          sharedBy: share.sharer?.name || "Unknown",
          sharedWith,
          parentId: type === "file" ? itemData.parentId : null,
        });
      }
    }

    res.render("sharing", {
      sharedItems,
      message:
        sharedItems.length === 0
          ? "No files or folders shared with you or shared by you."
          : null,
      user: userId,
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
    // Validate inputs
    if (!fileId) {
      console.error("Missing fileId parameter");
      return res.status(400).json({ error: "File ID is required" });
    }

    if (!loggedInUserId) {
      console.error("Missing logged in user ID from session");
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Find user using Sequelize
    const user = await User.findByPk(loggedInUserId);
    if (!user) {
      console.error("User not found:", loggedInUserId);
      return res.status(404).json({ error: "User not found" });
    }

    // Find file with its folder relationships
    const file = await File.findByPk(fileId, {
      include: [
        {
          model: Folder,
          as: "folder",
          required: false,
          include: [
            {
              model: CreateFolder,
              as: "linkedFolderRef",
              required: false,
            },
          ],
        },
        {
          model: CreateFolder,
          as: "linkedFolderRef", // Direct relationship to CreateFolder
          required: false,
        },
      ],
    });

    if (!file) {
      console.error("File not found in database:", fileId);
      return res.status(404).json({ error: "File not found" });
    }

    // Get folder path and department from the correct relationship
    let folderPath, folderDept, linkedFolderInfo;

    // Check if file is linked directly to CreateFolder or through Folder
    if (file.linkedFolderRef) {
      // File directly linked to CreateFolder
      folderPath = file.linkedFolderRef.path;
      folderDept = file.linkedFolderRef.department;
      linkedFolderInfo = "direct";
      // console.log('Using direct linked folder:', {
      //   path: folderPath,
      //   department: folderDept
      // });
    } else if (file.folder && file.folder.linkedFolderRef) {
      // File linked through Folder to CreateFolder
      folderPath = file.folder.linkedFolderRef.path;
      folderDept = file.folder.linkedFolderRef.department;
      linkedFolderInfo = "through_folder";
      // console.log('Using folder linked folder:', {
      //   path: folderPath,
      //   department: folderDept
      // });
    }

    if (!folderPath || !folderDept) {
      console.error("Missing folder path or department:", {
        fileId,
        folderPath,
        folderDept,
        linkedFolderInfo,
        fileStructure: {
          hasLinkedFolderRef: !!file.linkedFolderRef,
          hasFolder: !!file.folder,
          folderHasLinkedRef: !!(file.folder && file.folder.linkedFolderRef),
        },
      });
      return res.status(500).json({
        error: "Configuration error",
        message: "Folder path/department missing",
      });
    }

    // Validate FTP configuration
    if (!ftpCredentials || typeof ftpCredentials !== "object") {
      console.error("FTP credentials not configured");
      return res.status(500).json({
        error: "Configuration error",
        message: "FTP credentials not configured",
      });
    }

    const ftpConfig = ftpCredentials[folderDept];
    if (!ftpConfig) {
      console.error(`FTP config missing for department: ${folderDept}`);
      console.error("Available departments:", Object.keys(ftpCredentials));
      return res.status(404).json({
        error: "Configuration error",
        message: `FTP config missing for department: ${folderDept}`,
      });
    }

    const remoteFilePath = `/${folderPath}/${file.filename}`;
    const mimeType = mime.lookup(file.filename) || "application/octet-stream";

    // Find share using the new table structure
    // console.log('Checking share permissions for file:', fileId);

    // First, get the share record
    const share = await Share.findOne({
      where: { fileId: fileId },
    });

    if (!share) {
      console.error("No share record found for file:", fileId);
      return res.status(403).json({
        error: "Access denied",
        message: "This file is not shared.",
      });
    }

    // Check if user has access through direct sharing or shareToAll
    let hasAccess = false;
    let accessLevel = "read"; // default

    // Check if shareToAll is enabled
    if (share.shareToAll) {
      hasAccess = true;
      accessLevel = "read"; // default access level for shareToAll
      // console.log('Access granted via shareToAll');
    } else {
      // Check if user has explicit permission through SharedWith table
      const sharedWithRecord = await SharedWith.findOne({
        where: {
          shareId: share.id,
          userId: loggedInUserId,
        },
      });

      if (sharedWithRecord) {
        hasAccess = true;
        accessLevel = sharedWithRecord.access;
        // console.log('Access granted via direct share, level:', accessLevel);
      } else {
        // Also check if user has access through group membership
        const groupShare = await SharedWith.findOne({
          where: {
            shareId: share.id,
            groupId: { [Op.ne]: null },
          },
          include: [
            {
              model: CommitteeGroup,
              as: "group",
              include: [
                {
                  model: User, // Assuming groups have a users association
                  as: "members", // Adjust this alias based on your group-user relationship
                  where: { id: loggedInUserId },
                  required: true,
                },
              ],
            },
          ],
        });

        if (groupShare) {
          hasAccess = true;
          accessLevel = groupShare.access;
          // console.log('Access granted via group membership, level:', accessLevel);
        }
      }
    }

    // Check if user is the file owner (additional fallback)
    if (!hasAccess && file.uploadedBy === loggedInUserId) {
      hasAccess = true;
      accessLevel = "write";
      // console.log('Access granted as file owner');
    }

    if (!hasAccess) {
      console.error("Access denied:", {
        fileId,
        userId: loggedInUserId,
        shareExists: !!share,
        shareToAll: share.shareToAll,
        isOwner: file.uploadedBy === loggedInUserId,
      });
      return res.status(403).json({
        error: "Access denied",
        message: "You do not have permission to access this file.",
      });
    }

    // Check NoDownload access before FTP operations
    if (accessLevel === "NoDownload") {
      // console.log('Access denied: NoDownload permission');
      return res.status(403).json({
        error: "Access denied",
        message: "You do not have permission to download this file.",
      });
    }

    // **SECURITY HEADERS FOR HTTPS**
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // **CORS HEADERS FOR HTTPS**
    const origin = req.headers.origin;
    if (
      origin &&
      (origin.includes("https://") || origin.includes("http://localhost"))
    ) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );

    // **CACHE HEADERS FOR PDFs**
    if (mimeType === "application/pdf") {
      res.setHeader("Cache-Control", "private, max-age=3600");
      res.setHeader("ETag", `"${fileId}-${Date.now()}"`);
    }

    // console.log('Attempting FTP connection:', {
    //   host: ftpConfig.host,
    //   user: ftpConfig.user,
    //   remoteFilePath,
    //   secure: ftpConfig.secure || 'not specified'
    // });

    // FTP download with better error handling
    try {
      await client.access(ftpConfig);
      // console.log('FTP connection established successfully');
    } catch (ftpConnError) {
      console.error("FTP connection failed:", ftpConnError);
      return res.status(503).json({
        error: "FTP Connection Failed",
        message: "Unable to connect to file server",
      });
    }

    const writableStream = new stream.PassThrough();
    const fileBufferPromise = new Promise((resolve, reject) => {
      const chunks = [];
      writableStream.on("data", (chunk) => chunks.push(chunk));
      writableStream.on("end", () => {
        // console.log('FTP download completed, buffer size:', Buffer.concat(chunks).length);
        resolve(Buffer.concat(chunks));
      });
      writableStream.on("error", (err) => {
        console.error("Stream error:", err);
        reject(err);
      });
    });

    try {
      await client.downloadTo(writableStream, remoteFilePath);
      // console.log('FTP download initiated successfully');
    } catch (ftpError) {
      console.error("FTP download error:", {
        error: ftpError.message,
        code: ftpError.code,
        remoteFilePath,
      });

      // Check if it's a file not found error
      if (ftpError.code === 550 || ftpError.message.includes("No such file")) {
        return res.status(404).json({
          error: "File not found",
          message: "The requested file could not be found on the server",
        });
      }

      throw new Error(`FTP download failed: ${ftpError.message}`);
    }

    const fileBuffer = await fileBufferPromise;

    if (!fileBuffer || fileBuffer.length === 0) {
      console.error("Empty file buffer received");
      return res.status(404).json({
        error: "File not found",
        message:
          "The file exists in database but could not be retrieved from storage",
      });
    }

    if (mimeType === "application/pdf") {
      try {
        // console.log('Processing PDF, buffer size:', fileBuffer.length);

        const pdfDoc = await PDFDocument.load(fileBuffer, {
          ignoreEncryption: true,
        });

        const newPdfDoc = await PDFDocument.create();
        const pages = await newPdfDoc.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        pages.forEach((page) => newPdfDoc.addPage(page));
        const newBuffer = await newPdfDoc.save();

        // console.log('PDF processed successfully, new buffer size:', newBuffer.length);

        // **ENHANCED PDF HEADERS FOR HTTPS**
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", newBuffer.length);
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${encodeURIComponent(file.filename)}"`
        );

        // **SECURITY HEADERS SPECIFIC TO PDF**
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; object-src 'none';"
        );

        return res.send(Buffer.from(newBuffer));
      } catch (pdfError) {
        console.error("PDF processing error:", pdfError);
        // console.log("Falling back to original PDF");

        // Fallback: serve original PDF if processing fails
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", fileBuffer.length);
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${encodeURIComponent(file.filename)}"`
        );
        return res.send(fileBuffer);
      }
    }

    // For non-PDFs
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", fileBuffer.length);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(file.filename)}"`
    );

    return res.send(fileBuffer);
  } catch (err) {
    console.error("ShareFilesView Error:", err);
    console.error("Error stack:", err.stack);

    // **ENHANCED ERROR HANDLING FOR HTTPS**
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");

      // Provide more specific error information
      if (err.code === "ECONNREFUSED") {
        return res.status(503).json({
          error: "Service temporarily unavailable",
          message: "FTP server connection failed",
        });
      } else if (
        err.code === "ENOTFOUND" ||
        err.message.includes("FTP download failed")
      ) {
        return res.status(404).json({
          error: "File not found",
          message: "The requested file could not be located on the server",
        });
      } else if (err.message.includes("PDF processing")) {
        return res.status(500).json({
          error: "PDF Processing Error",
          message: "Failed to process PDF file",
        });
      } else if (err.name === "SequelizeConnectionError") {
        return res.status(503).json({
          error: "Database connection error",
          message: "Unable to connect to database",
        });
      } else {
        return res.status(500).json({
          error: "Internal Server Error",
          message:
            process.env.NODE_ENV === "development"
              ? err.message
              : "An error occurred while processing your request",
        });
      }
    }
  } finally {
    try {
      client.close();
    } catch (closeError) {
      console.error("Error closing FTP client:", closeError);
    }
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
