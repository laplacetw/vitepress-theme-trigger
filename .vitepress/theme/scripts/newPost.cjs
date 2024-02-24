const fs = require('fs');

const args = process.argv.slice(2);

if (!args.length) {
  console.log('[ERROR]: Please input filename of new post');
  process.exit(1);
}

const filename = args[0];
const title = `${filename.charAt(0).toUpperCase()}${filename
  .replaceAll('-', ' ')
  .slice(1)}`;
const date = new Date().toJSON().slice(0, 10);
const time = new Date().toLocaleTimeString('en-US', { hourCycle: 'h23'});
const markdown = `---
date: ${date} ${time}
title: ${title}
outline: deep
category: 
tags:
- 
---
write excerpt here

---`;

try {
  fs.writeFileSync(`./posts/${filename}.md`, markdown);
  console.log('[INFO]: New post is created successfully');
} catch (e) {
  console.log(`[ERROR]: Failed to create new post - ${e}`);
}