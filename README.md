<img src="/src/assets/imgs/favicon_page.png" alt="tittle pag" style="border-radius: 50%;/>

# React Ecommerce - FunkoLand !

This project is a Funko ecommerce site developed in React with TypeScript, using Vite and JSON-Server to simulate a local product API.

## Table of Contents
- [React Ecommerce - Funko Store](#react-ecommerce---funko-store)
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies and Concepts](#technologies-and-concepts)
- [Conclusion](#conclusion)
- [Preview](#preview)

## Introduction

This project offers Funko enthusiasts the opportunity to explore and purchase their favorite character figures on an ecommerce platform built with React. The project utilizes TypeScript and leverages Vite for fast code compilation, and JSON-Server to simulate a locally stored product API.

## Features
- Browsing and purchasing Funkos.
- Searching and filtering Funkos.
- Shopping cart management.

## Requirements
To run the project, you need to have the following requirements installed:
- Node.js
- pnpm (or npm)
- Vite
- JSON-Server

## Installation
Follow these steps to install the project:
1. Clone the repository:
git clone https://github.com/ivanlomoro/react-ecommerce-typescript.git

2. Navigate to the project directory:
cd react-ecommerce-typescript

3. Install the dependencies:
pnpm install

## Usage
To run the project, first start JSON-Server to simulate the product API with the following command:
```sh
json-server --watch data.json --port 3001
```
Resources
  http://localhost:3001/products
  Home
  http://localhost:3001

Then, start the application with Vite:

```sh
pnpm run dev
```
Access the project through your browser at http://localhost:5173.

## Technologies and Concepts
HTML, CSS
TypeScript
React
Vite
JSON-Server
Prop-drilling
useState, useEffect
Conditionals and error handling
React Router
useContext
Inputs and forms
Async/Await
React Router with dynamic and private routes
useParams, custom hooks
useReducer

## Conclusion
In working on this project, I've gained valuable experience in building a complex React application with TypeScript, incorporating essential concepts like routing, state management, and error handling. The project also provided the opportunity to work with Vite and JSON-Server, which are powerful tools for rapid development and simulating APIs. This experience has deepened my knowledge of modern web development, and I look forward to applying what I've learned in future projects.

## Preview
<table>
  <tr>
    <td><img src="./src/assets/preview/desktopVersion.gif" alt="Desktop Version" width="400"/></td>
    <td><img src="./src/assets/preview/mobileVersion.gif" alt="Mobile Version" width="400"/></td>
  </tr>
</table>