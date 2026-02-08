# Developer Notes: Handover Status

## Current Status (Feb 8, 2026)
The project is a React + Express + SQLite homework management app ("Mom & Daughter").
We recently attempted to add "Fun Features":
1.  **Sticker Board**: Persistent reward system.
2.  **Mom's Memo**: A message board for Mom to leave notes.

## Known Issues (Critical)
The user reports that despite the code seemingly being correct:
- **Sticker Board**: `+` / `-` buttons are unresponsive.
- **Memo Widget**: Messages are not saving or appearing.

## Potential Causes to Investigate
1.  **Server Restart**: It is possible the `node server/index.js` process was not successfully restarted to load the new API endpoints (`/api/stickers`, `/api/memos`).
2.  **Database Locks**: SQLite might be locked, preventing schema migrations (adding columns/tables).
3.  **CORS/Network**: Verify `client/src/components/StickerBoard.jsx` fetch calls match the server port (5000).

## Key Files
- `server/index.js`: Contains the SQLite schema and API endpoints. Check specifically for the `Fun Features API` section.
- `client/src/components/StickerBoard.jsx`: Frontend for stickers.
- `client/src/components/MemoWidget.jsx`: Frontend for memos.
