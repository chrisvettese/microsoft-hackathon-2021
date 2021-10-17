
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'




export function getFilePath(url, relPath){
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    return path.join(__dirname, relPath);
}