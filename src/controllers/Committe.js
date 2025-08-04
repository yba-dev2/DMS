const { Sequelize } = require("sequelize");
const { User,  CommitteeGroup} = require("../config/dbConnector");

const AddGroups = async (req, res) => {
  try {
    // Fetch all users, selecting id, name, department
    const allUsers = await User.findAll({
      attributes: ['id', 'name', 'department'],
    });

    // Fetch logged-in user by session userId, if exists
    const user = req.session.userId
      ? await User.findByPk(req.session.userId)
      : null;

    // Render the view with data
    res.render('Committe', { user, allUsers, message: null });
  } catch (error) {
    console.error('Error in groups:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function To add Groups 
const AddGroupMembers = async (req, res) => {
  try {
    let { groupName, memberSecretary, members } = req.body;

    // Ensure members is always an array
    if (!Array.isArray(members)) {
      members = [members];
    }

    // Check if the group already exists
    const existingGroup = await CommitteeGroup.findOne({ where: { groupName } });
    if (existingGroup) {
      req.flash("success", "Group or Committee Already Exists.");
      return res.redirect("/groups");
    }

    // Validate required fields
    if (!groupName || !memberSecretary || members.length === 0) {
      return res.status(400).send("All fields are required");
    }

    // Create the new committee group
    const newCommittee = await CommitteeGroup.create({
      groupName,
      memberSecretary: memberSecretary, // matches your model definition
    });

    // Associate users as members via the many-to-many relationship
    await newCommittee.setMembers(members); // This populates the junction table

    res.redirect("/ViewGroups");
  } catch (error) {
    console.error("Error creating committee:", error);
    res.status(500).send("Internal Server Error");
  }
};



const ViewGroups = async (req, res) => {
  try {
    // 1. Get logged-in user
    const user = req.session.userId
      ? await User.findByPk(req.session.userId)
      : null;

    // 2. Get all users with selected fields
    const allUsers = await User.findAll({
      attributes: ['id', 'name']
    });

    // 3. Get all committee groups with memberSecretary and members populated
    const groups = await CommitteeGroup.findAll({
      include: [
        {
          model: User,
          as: 'secretary',
          attributes: ['id', 'name', 'department'],
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'name', 'department'],
          
        },
      ],
    });

    // 4. Render the view
    res.render('ViewGroups', {
      user: user || null,
      groups: groups || [],
      allUsers: allUsers || [],
      currentUserId: req.session.userId,
    });
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).send('Internal Server Error');
  }
};


//Edit Group Name
const editGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const currentUserId = req.session.userId;

    const group = await CommitteeGroup.findByPk(groupId, {
      include: [
        {
          model: User,
          as: 'secretary', // Group leader
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'members', // Group members
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] } // omit join table fields
        }
      ]
    });

    if (!group) {
      return res.status(404).send("Group not found");
    }

    if (group.secretary.id !== currentUserId) {
      return res.status(403).send("Access denied. Only group leader can edit this group.");
    }

    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });

    res.render("EditGroup", {
      group,
      users,
      user: currentUserId,
    });

  } catch (error) {
    console.error("Error in edit group:", error);
    res.status(500).send("Internal Server Error");
  }
};


//Post Edited Group
const postEditGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const { groupName, memberSecretary, members } = req.body;

    // Ensure members is always an array
    const membersArray = Array.isArray(members) ? members : [members];

    const updatedGroup = await CommitteeGroup.findByIdAndUpdate(
      groupId,
      {
        groupName,
        memberSecretary,
        members: membersArray,
      },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).send("Committee Group not found");
    }
     req.flash("success", "Group details successfully Updated.");
    res.redirect("/committees");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete The group 
const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const currentUserId = req.session.userId;

    // Check if user is logged in (might be redundant if requireAuth middleware handles this)
    if (!currentUserId) {
      return res.status(401).json({ 
        success: false, 
        message: "Please log in to perform this action" 
      });
    }

    // Find the group and populate memberSecretary to check leadership
    const group = await CommitteeGroup.findById(groupId).populate("memberSecretary");

    if (!group) {
      return res.status(404).json({ 
        success: false, 
        message: "Group not found" 
      });
    }

    // Check if current user is the group leader (memberSecretary)
    if (!group.memberSecretary || group.memberSecretary._id.toString() !== currentUserId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Only the group leader can delete this group." 
      });
    }

    // Delete the group
    await CommitteeGroup.findByIdAndDelete(groupId);

    res.status(200).json({ 
      success: true, 
      message: "Group deleted successfully" 
    });

  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};
module.exports = {
  AddGroupMembers,
  AddGroups,
  ViewGroups,
  editGroup,
  postEditGroup,
  deleteGroup
};
