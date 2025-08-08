const {ERPURL} = require('../config/ErpURL');
const {Sequelize} = require("sequelize")
const { User, File, Folder, CreateFolder, Share, SharedWith } = require('../config/dbConnector');
const { Client } = require('ssh2');
const home = async (req, res) => {
  try {
    let currentPath = req.query.path || '/'; // Default to root path if not provided
    // Set the current path in the session for later use
    req.session.currentPath = currentPath;
    currentPath = decodeURIComponent(currentPath);
	
    
    // Check if user is logged in
    if (!req.session.userId) {
      return res.redirect(`${ERPURL}`); 
    }

    // Fetch the logged-in user details from the database
    const user = await User.findByPk(req.session.userId);
    
    if (!user) {
      req.flash("error", "User Not Found!");
      return res.status(404).send("User not found");
    }

    req.flash("success", "Login successful!");
    return res.render('welcome.ejs', { user, currentPath });
  } catch (error) {
    req.flash("error", "Internal Server Errore");
    return res.redirect(`${ERPURL}`); 
  }
};

// QNAP share folder mapping based on your users
const shareMapping = {
  'ZFS18_DATA': 'Finance',
  'ZFS19_DATA': 'HRAD',
  'ZFS20_DATA': 'Information Technology'
};

const getStorageForUser = (userShare) => {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn.on('ready', () => {
      const command = `df -h | grep '/share/${userShare}'`;

      conn.exec(command, (err, stream) => {
        if (err) return reject(err);

        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.stderr.on('data', chunk => console.error('SSH Error:', chunk.toString()));
        stream.on('close', () => {
          conn.end();
          const parts = data.trim().split(/\s+/);

          if (parts.length >= 6) {
            resolve({
              size: parts[1],
              used: parts[2],
              avail: parts[3],
              usePercent: parts[4],
              mountPoint: parts[5],
              displayName: shareMapping[userShare] || userShare
            });
          } else {
            reject(new Error('Invalid SSH output'));
          }
        });
      });

    }).connect({
      host: '172.16.16.111',
      port: 22,
      username: 'System',
      password: 'p1ne@pple'
    });
  });
};

const welcome = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Session expired or user not logged in");
      return res.redirect(`${ERPURL}`);
    }

    const user = await User.findByPk(req.session.userId);
    if (!user) {
      req.flash("error", "User Not Found!");
      return res.status(404).send("User not found");
    }

    // Count totals
    const [totalFolders, totalFiles, sharedFiles] = await Promise.all([
      CreateFolder.count(),
      File.count(),
      Share.count()
    ]);

    // Determine user's assigned QNAP share folder
    const userShare = user.qnapShare || 'ZFS18_DATA'; // adjust field as needed

    // Fetch QNAP storage info via SSH
    const storage = await getStorageForUser(userShare);

    req.flash("success", "Login successful!");

    return res.render('index.ejs', {
      messages: req.flash(),
      user,
      stats: {
        totalFolders,
        totalFiles,
        sharedFiles
      },
      storage // now available in EJS
    });

  } catch (error) {
    console.error("Error loading user:", error.message);
    res.status(500).send("Internal server error");
  }
};


module.exports = {
  getWelcome: welcome,
    getHome: home

};
// export default welcome;

