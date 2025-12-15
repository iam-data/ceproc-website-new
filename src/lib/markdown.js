import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export function getMarkdownContent(filename) {
  const filepath = path.join(process.cwd(), 'content', `${filename}.md`);
  const content = fs.readFileSync(filepath, 'utf8');
  const { data, content: body } = matter(content);
  return { meta: data, body };
}