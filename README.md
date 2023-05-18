# MegaK-Head-Hunter-BACK
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

# production mode
$ yarn run start:prod
```


