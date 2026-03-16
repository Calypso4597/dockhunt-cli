#!/usr/bin/env node

import child_process from 'child_process';
import { scanDockAndBringToWebApp, exportDock } from "./utils.js";

// Entry point for the Dockhunt CLI

// TODO: Don't allow to run and show an error, unless on macOS

const args = process.argv.slice(2);
const exportIndex = args.indexOf('--export');
const exportPath = exportIndex !== -1 ? args[exportIndex + 1] : null;

if (exportIndex !== -1 && !exportPath) {
    console.error('Usage: dockhunt --export <output-dir>');
    console.error('Example: dockhunt --export ./my-dock');
    process.exit(1);
}

console.log('Scanning your dock...\n');

child_process.exec('defaults export com.apple.dock -', (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        process.exit(1);
    }

    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }

    if (exportPath) {
        exportDock(stdout, exportPath);
    } else {
        scanDockAndBringToWebApp(stdout);
    }
});
