const chokidar = require('chokidar');
const EventEmitter = require('events');
const readLastLines = require('read-last-lines');

class Observer extends EventEmitter {
  watchFile(targetFolder) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for file changes on: ${targetFolder}`
      );

      const watcher = chokidar.watch(targetFolder, { persistent: true });

      watcher.on('change', async filePath => {
        console.log(
          `[${new Date().toLocaleString()}] ${filePath} has been updated.`
        );

        const updateContent = await readLastLines.read(filePath, 1);

        this.emit('files-updated', { message: updateContent });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Observer;
