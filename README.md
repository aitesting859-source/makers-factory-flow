# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4a719239-90b5-4cb5-a48c-a659a60731b4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4a719239-90b5-4cb5-a48c-a659a60731b4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the frontend development server.
npm run dev

# Step 5: (Optional) Start the backend API server in another terminal.
npm run dev:backend
```

## Backend API

This repository now includes a lightweight Node.js backend under `backend/`.

### Run backend

```sh
npm run start:backend
```

By default, it listens on `http://localhost:4000`. You can change it with:

```sh
BACKEND_PORT=5000 npm run start:backend
```

### Available endpoints

- `GET /api/health` - health check status.
- `GET /api/services` - portfolio service catalog.
- `GET /api/media` - media configuration for images/videos used by frontend pages.
- `GET /api/inquiries` - list submitted inquiries.
- `POST /api/inquiries` - create an inquiry.
- `GET /api/media/usage` - key-to-file usage map used by admin UI.
- `PUT /api/media` - save full media config object.

Example request body for `POST /api/inquiries`:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "serviceId": "wedding-by-tmf",
  "message": "Looking for coverage in November."
}
```

Inquiries are stored locally in `backend/data/inquiries.json`.


### Replacing all photos and videos from backend

Open backend admin UI:

```sh
http://localhost:4000/admin
```

The admin page lets you:
- edit all media JSON in one place
- save changes directly to `backend/data/media.json`
- see **exactly which frontend files** each key affects

Edit `backend/data/media.json` to control website media without touching frontend code.

- `global.showreelVideo` controls shared reel video usage.
- `wedding.landing.*` controls landing page gallery and stacked images.
- `about.*` controls About page/section photos.
- `replacements` lets you map any existing URL to a new URL globally.

Example replacement map entry:

```json
{
  "replacements": {
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800": "https://your-cdn.com/new-image-1.jpg",
    "/showreel.mp4": "https://your-cdn.com/new-showreel.mp4"
  }
}
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js HTTP backend

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4a719239-90b5-4cb5-a48c-a659a60731b4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
