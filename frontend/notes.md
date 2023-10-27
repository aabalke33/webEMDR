
First React, Node, Express, Tailwind, Redis Project

Other
Vite, PostCSS




Structural (Why React)
Glorified Web Page, no state on server required. No state between sessions required.

Fun Things:

- Custom Tailwind Animations
- Sending state upwards is a pain
- MANY Dependencies, used to this from Java, but I have to get used to it in here
- React state control of tailwind css
- I prefer Vite over CRA
- Tailwind is amazing, Node is pretty alright, React I have to get used to
- Terinary Ops in css to change based on state (Really proud of), use Rem/Mod ops to calc
- SetInterval Counter lagging: Fixed by polling every 1/10 second, get floor of difference between start time and now. Only updats every second, but polls 1/10th to no get behind
- Embed Audio follows useState useEffect

Next Steps Personally:
- On a larger project, state management will be more important, may require statement manager like redux.
- Need to begin to take into account accessibility


Update V1.1
Node, Express, SQLite
- Add Admin, and User version
- Admin updates session info (play, speed) and in turn client will poll for changed (Polling)

Update V1.2
Replace SQLite with Vercel KV (Redis)
- Why Redis?
    - Do not need Persistent Storage
    - Need fast query times