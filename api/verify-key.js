import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const key = (req.query.key || '').toUpperCase();
  const keysPath = path.join(process.cwd(), 'api', 'apikey.json');
  const keys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));

  if(keys.includes(key)) {
    res.status(200).json({ valid: true });
  } else {
    res.status(200).json({ valid: false });
  }
}
