import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'Users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
}

export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const users = readUsers();

    // Validate required fields
    if (
      !body.name ||
      !body.username ||
      !body.email ||
      !body.address ||
      !body.company
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now(),
      name: body.name,
      username: body.username,
      email: body.email,
      address: {
        street: body.address.street || '',
        suite: body.address.suite || '',
        city: body.address.city || '',
        zipcode: body.address.zipcode || '',
        geo: {
          lat: body.address.geo?.lat || '',
          lng: body.address.geo?.lng || '',
        },
      },
      phone: body.phone || '',
      website: body.website || '',
      company: {
        name: body.company.name || '',
        catchPhrase: body.company.catchPhrase || '',
        bs: body.company.bs || '',
      },
    };

    users.push(newUser);
    writeUsers(users);

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
