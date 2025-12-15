'use server';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function getMarkdownContent(filename: string) {
  try {
    const filepath = path.join(process.cwd(), 'content', `${filename}.md`);
    const content = fs.readFileSync(filepath, 'utf8');
    const { data, content: body } = matter(content);
    
    return { meta: data, body };
  } catch (error) {
    console.error(`Error reading markdown file: ${filename}`, error);
    return { meta: {}, body: '' };
  }
}

export async function getJsonContent(filename: string) {
  try {
    const filepath = path.join(process.cwd(), 'content', `${filename}.json`);
    const content = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading JSON file: ${filename}`, error);
    return {};
  }
}