const { Plugin } = require('obsidian');

module.exports = class EmbedFileWithHeaderPlugin extends Plugin {
  async onload() {
    console.log('EmbedFileWithHeaderPlugin loaded!');

    this.registerMarkdownCodeBlockProcessor('^\\^\\[\\[(.*?)#(.*?)(\\d+)\\]\\]$', async (source, el) => {
      const [, fileName, headerName, headingLevelReduction] = source.match(/^\\\^\\\[\[(.*?)#(.*?)(\\d+)\\\]\\]$/);

      const fileContents = await this.app.vault.read(fileName);

      const modifiedContents = fileContents.replace(/^(#+)\s(.*)$/gm, (match, p1, p2) => {
        const currentLevel = p1.length;
        const newLevel = currentLevel - headingLevelReduction;
        return '#'.repeat(newLevel) + ' ' + p2;
      });

      el.innerHTML = modifiedContents;
    });
  }

  onunload() {
    console.log('EmbedFileWithHeaderPlugin unloaded!');
  }
}
