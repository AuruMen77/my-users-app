import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'Users.json');

function readUsersFromFile() {
  try {
    const json = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(json);
  } catch (err) {
    console.error('Failed to read users file', err);
    return [];
  }
}

function writeUsersToFile(users) {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const users = readUsersFromFile();
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    try {
      const users = readUsersFromFile();
      const newUser = req.body;

      // basic validation - ensure required fields
      const required = ['name', 'email', 'company'];
      for (const r of required) {
        if (!newUser[r]) {
          return res.status(400).json({ error: `${r} is required` });
        }
      }

      // ensure company is an object with name
      if (typeof newUser.company === 'string') {
        newUser.company = { name: newUser.company };
      } else if (!newUser.company.name) {
        return res.status(400).json({ error: 'company.name is required' });
      }

      // set id and defaults
      newUser.id = Date.now().toString();

      users.push(newUser);
      writeUsersToFile(users);

      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
