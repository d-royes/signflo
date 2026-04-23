import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), '.data.json');

export async function saveAgreement(schema: any): Promise<string> {
    const id = Math.random().toString(36).substring(2, 10);
    let data: any = {};
    try {
        const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
        data = JSON.parse(fileContent);
    } catch (e) {
        // File doesn't exist yet, which is fine
    }
    
    data[id] = schema;
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    return id;
}

export async function getAgreement(id: string): Promise<any | null> {
    try {
        const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
        const data = JSON.parse(fileContent);
        return data[id] || null;
    } catch (e) {
        return null;
    }
}
