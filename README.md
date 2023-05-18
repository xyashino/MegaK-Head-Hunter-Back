# MegaK-Head-Hunter-Back

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

**MegaK-Head-Hunter** - It is a full-stack web application that allows headhunters to browse student profiles, add them to conversations, and hire them. The application was created as part of the MegaK course.

The application is divided into three roles: Admin, Student, and HeadHunter. Each of these roles has access to different functionalities.

**Admin** can:

- Add new users,
  - Students through importing the appropriate CSV file,
  - Headhunters through a form.

**Student** can:

- View their data,
- Change their data,
- Mark themselves as hired.

**HeadHunter** can:

- Browse student profiles,
- Add students to conversations,
- Hire students.

Each user can:

- Change their password,
- Reset their password (they receive an email with a password reset link).

### Repositories

- [FRONTEND](https://github.com/xyashino/MegaK-Head-Hunter-Front)
- [BACKEND](https://github.com/xyashino/MegaK-Head-Hunter-BACK)

You are currently browsing the **BACKEND REPOSITORY**.

**MegaK-Head-Hunter-Back** -
The application was created using the **NestJS** framework. 
It utilizes **TypeOrm** as the Object-Relational Mapping (ORM) tool for working with a **MySQL** database.
The application implements **authorization** and **authentication** functionalities, with data serialization performed using **DTOs** (Data Transfer Objects).
Additionally, it includes features such as **pagination** and data **filtration**. 
Furthermore, the application incorporates a logic for **sending emails**.

## You can test the entire application here : [HERE](https://megak.yashino.live/)

## API Endpoints

<p>- <code>/hr</code> | <span style="color: #e02635;">POST, GET</span></p>
<p>- <code>/hr/register/:id</code> | <span style="color: #e02635;">POST</span></p>
<p>- <code>/hr/:id</code> | <span style="color: #e02635;">GET, DELETE, PATCH</span></p>
<p>- <code>/users</code> | <span style="color: #e02635;">POST, GET</span></p>
<p>- <code>/users/current</code> | <span style="color: #e02635;">GET</span></p>
<p>- <code>/users/:id</code> | <span style="color: #e02635;">GET, PATCH, DELETE</span></p>
<p>- <code>/interview</code> | <span style="color: #e02635;">POST, GET</span></p>
<p>- <code>/interview/:id</code> | <span style="color: #e02635;">GET, DELETE</span></p>
<p>- <code>/students</code> | <span style="color: #e02635;">POST, GET</span></p>
<p>- <code>/students/register/:id</code> | <span style="color: #e02635;">POST</span></p>
<p>- <code>/students/:id</code> | <span style="color: #e02635;">GET, DELETE, PATCH</span></p>
<p>- <code>/auth/login</code> | <span style="color: #e02635;">POST</span></p>
<p>- <code>/auth/password/reset</code> | <span style="color: #e02635;">POST</span></p>
<p>- <code>/auth/password/reset/request</code> | <span style="color: #e02635;">POST</span></p>
<p>- <code>/auth/logout</code> | <span style="color: #e02635;">DELETE</span></p>
<p>- <code>/upload/file</code> | <span style="color: #e02635;">POST</span></p>

## Environment Variables

The application uses environment variables for configuration. 
You can set these variables by creating a `.env` file in the root directory of the project and populating it with the following values. 
You have a base `.env.example` file in the root directory of the project that you can use as a template to create your own `.env` file.

## Clone

```bash
$ git clone https://github.com/xyashino/MegaK-Head-Hunter-Back.git
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```
