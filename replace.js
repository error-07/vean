import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src/app');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // We want to lighten the background.
    // bg-zinc-950 -> bg-zinc-900
    // bg-zinc-900 -> bg-zinc-800
    // bg-zinc-800 -> bg-zinc-700
    content = content.replace(/bg-zinc-800/g, 'bg-zinc-700');
    content = content.replace(/bg-zinc-900/g, 'bg-zinc-800');
    content = content.replace(/bg-zinc-950/g, 'bg-zinc-900');

    // And also border-zinc-800 -> border-zinc-700
    // border-zinc-900 -> border-zinc-800
    content = content.replace(/border-zinc-800/g, 'border-zinc-700');
    content = content.replace(/border-zinc-900/g, 'border-zinc-800');

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Done replacing zinc colors.');
