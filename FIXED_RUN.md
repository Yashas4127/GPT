# GPT project - fixed frontend/backend integration

## Run backend
From the project root:
```powershell
npm install
npm run dev
```
Backend runs on `http://localhost:5000`.

## Run frontend
Open a second terminal:
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

The Vite proxy forwards `/user`, `/chat`, and `/msg` to the backend, so the frontend `.env` can remain empty.

## Important fixes
- Fixed `ChatProvider` placement so `useParams()` receives `:chatId`.
- Previous chats now load their messages when selected.
- Fixed frontend handling of chat API responses.
- New-chat response now returns and uses `chatId`.
- Added `model` and timestamps to single-chat response.
- Added MongoDB ObjectId validation.
- Fixed JWT creation during signup.
- Fixed Zod success checks.
- Imported and safely executed the summary updater.
- Cleaned duplicate frontend `dev` script.
- Added backend `dev`/`start` scripts.

## If the browser still shows old behavior
Stop both servers and restart:
```powershell
# backend
npm run dev

# frontend
cd frontend
npm run dev
```
Then hard refresh the browser with Ctrl+Shift+R.
