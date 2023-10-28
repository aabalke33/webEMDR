# webEMDR
Remotely Host EMDR Therapy Treatment

The web app is available [here](https://web-emdr.vercel.app/).

## Client Purpose
webEMDR is a web application to enable Eye Movement Desensitization and Reprocessing (EMDR) Treatment remotely between a therapist and their client. The mental health provider required the ability to remotely control a clients webpage, adjust the speed, play/pause options, and count the cycles. 

## Individual Purpose
This is my second web application and my first one using common frameworks and web development technologies.
My first web application, [jot](https://jotapp-demo.vercel.app/), used Vanilla Javascript, HTML, and CSS with a Python Flask backend and MySQL database. This was my introduction to React (Vite), Node, Express, Tailwind, and Redis. In the future I will be looking further into more methods/technologies, I am really curious about state management solutions such as Redux, and other React Frameworks like Next.js.

## Structure, Stack and Technologies
This application can be broken into three portions:
1. Redis Database: Deployed using Vercel, the Redis Database is used to connect the therapist session to the client to share EMDR display data (Play/Pause, and the Speed). In this use case, Redis was chosen since persistence is not required, data relations are not required and quick access is a must. Everything is accessed through session IDs.
2. Node.js & Express Backend: I used Node.js and Express as my backend to connect the Redis Database to the React Frontend. No static files are sent from the backend.
3. React (Vite) & Tailwind Frontend: The frontend was written using React and Tailwind. I used Vite as my React Framework since this would be a one-page web application, I felt Next.js and other Frameworks would be overkill. Tailwind was used to simplify the CSS - particularly animating the EMDR circle.

### User vs Admin/Therapist
When an Admin/Therpist creates a session, every change on that page is sent to the Database to update the backend state
When a user connects to a session, the page polls the server to check if the session information has been updated. If it has it updates the user's CSS.

I chose polling over WebSockets since so little data is being sent. I am not sure with time if WebSockets will become a better option.

## Lessons Learned
- I had no clue how important state is in React. It quickly can get out of hand and I am interested in using a State Management solution like Redux.
- This was the first project I was 'casually' using ternary and modulus operations, React strongly pushes you towards using them with component rendering and state changes.

## Misc Notes
- PostCSS was used in this project, but that was automatic through Tailwind.
- Before Redis, I tried using a SQLite database in memory on the Node/Express Backend. This would have worked fine with a persistent server; however, since I hosted using Vercel Serverless Functions, problems occurred in accessing the database, making it not viable for production.

## Security
- At this time passcodes are the session IDs. I am not sure if that is okay in the long run.
- No PHI or PII records are shared on the web application or stored. The only information is the randomized session ID, if the animation is playing, and at what speed.

## Roadmap
- Websockets: Need to research if WebSockets would be a better option than polling for user pages.