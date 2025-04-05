<p align="center">
  <img src="https://raw.githubusercontent.com/Xapixowy/arkham-horror-backend/refs/heads/main/public/assets/images/email/banner.webp" alt="logo" width="500"/>
</p>

<h1 align="center">Arkham Horror</h1>

<p align="center">Application to make Arkham Horror games easier.</p>
<p align="center">This repository is closely linked to <a href="https://github.com/Xapixowy/arkham-horror-backend">another one</a>, which handles the <a href="https://github.com/Xapixowy/arkham-horror-backend">backend</a>, while this one is the <b><u>frontend</b></u>.</p>

<h2>Table of contents</h2>
<ul>
  <li><a href="#description">Description</a></li>
  <li><a href="#tech-stack">Tech Stack</a>
    <ul>
      <li><a href="#angular">Angular</a></li>
      <li><a href="#priemng">PrimeNg</a></li>
      <li><a href="#ngrx">NgRx</a></li>
      <li><a href="#socketio">Socket.IO</a></li>
    </ul>
  </li>
  <li><a href="#installation">Installation</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#steps">Steps</a></li>
    </ul>
  </li>
</ul>

<h2 id="description">Description</h2>
<p>The application was designed to simplify managing characters and game elements during Arkham Horror board game sessions. It provides real-time updates on the game phase and allows easy management of items, spells, companions, and other resources directly through the interface.</p>

<h2 id="tech-stack">Tech Stack</h2>
<p align="center">
  <img src="https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif" alt="logo" width="130"/>
</p>
<h3 align="center" id="angular"><a href="https://angular.dev/">Angular</a></h3>
<p>Angular is a popular open-source web application framework developed by Google for building dynamic, single-page applications using HTML, CSS, and TypeScript.</p>

<p align="center">
  <img src="https://i0.wp.com/www.primefaces.org/wp-content/uploads/2021/10/primeng-logo.png?fit=280%2C300&ssl=1" alt="logo" width="100"/>
</p>
<h3 align="center" id="primeng"><a href="https://primeng.org/">PrimeNg</a></h3>
<p>PrimeNG is a collection of rich UI components for Angular, offering a wide range of customizable and responsive elements to build modern web applications.</p>

<p align="center">
  <img src="https://ngrx.io/assets/images/badge.svg" alt="logo" width="100"/>
</p>
<h3 align="center" id="ngrx"><a href="https://ngrx.io/">NgRx</a></h3>
<p>NgRx is a state management library for Angular applications, inspired by Redux, that helps manage application state using reactive programming and RxJS for better scalability and maintainability.</p>

<p align="center">
  <img src="https://socket.io/images/logo-dark.svg" alt="logo" width="100"/>
</p>
<h3 align="center" id="socketio"><a href="https://socket.io">Socket.IO</a></h3>
<p>Socket.IO client is a JavaScript library for real-time, bidirectional communication between web clients and servers, allowing the frontend to easily connect to a Socket.IO server for features like chat, live updates, and real-time notifications.</p>

<h2 id="installation">Installation</h2>
<p>To simplify the installation process, the project uses a Docker.</p>
<p>Remember, this application is tightly linked to the <a href="https://github.com/Xapixowy/arkham-horror-backend">backend</a>, and you should also set up <a href="https://github.com/Xapixowy/arkham-horror-backend">that project</a> to get the full functionality.</p>

<h3 id="prerequisites">Prerequisites</h3>
<ul>
  <li><a href="https://www.docker.com/">Docker</a></li>
</ul>

<h3 id="steps">Steps</h3>
<h4>1. Environment variables</h4>

Copy `.env.example` file to `.env`. You don't need to make any changes there.
```bash
cp .env.example .env
```
<h4>2. Build Docker container</h4>

Just run the command to build the container and wait.
```bash
docker-compose up -d
```

<h4>3. Enjoy :)</h4>
