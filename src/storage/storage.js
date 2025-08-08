const { Client } = require('ssh2');

const conn = new Client();

const sshConfig = {
  host: '172.16.16.111',
  port: 22,
  username: 'System', // or another SSH-enabled user
  password: 'p1ne@pple',
};

conn.on('ready', () => {
  console.log('SSH connection ready');

  // Filter df for /share/ZFS folders
  conn.exec("df -h | grep -E '/share/ZFS(18|19|20)_DATA'", (err, stream) => {
    if (err) throw err;

    let data = '';

    stream.on('close', (code, signal) => {
      conn.end();

      console.log('Filtered df output:\n', data);

      const lines = data.trim().split('\n');
      const results = [];

      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 6) {
          const filesystem = parts[0];
          const size = parts[1];
          const used = parts[2];
          const avail = parts[3];
          const usePercent = parts[4];
          const mountPoint = parts[5];

          results.push({
            filesystem,
            size,
            used,
            avail,
            usePercent,
            mountPoint
          });
        }
      });

      // Log each shared folder's usage
      results.forEach(info => {
        console.log(`\nShared Folder: ${info.mountPoint}`);
        console.log(`  Total: ${info.size}`);
        console.log(`  Used: ${info.used}`);
        console.log(`  Available: ${info.avail}`);
        console.log(`  Usage: ${info.usePercent}`);
      });
    });

    stream.on('data', (chunk) => {
      data += chunk;
    });

    stream.stderr.on('data', (chunk) => {
      console.error('STDERR: ' + chunk);
    });
  });

}).connect(sshConfig);
