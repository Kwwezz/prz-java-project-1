# Dashboard Application

## Overview
This project is a full-stack dashboard application designed to manage customers and their associated tasks. It uses Angular for the frontend, Spring Boot for the backend, and MariaDB (running on Docker) for database management. Tasks can be nested hierarchically using a `parentId` reference.

---

## Technologies Used

- **Frontend:** Angular
- **Backend:** Java Spring Boot & Gradle build tool
- **Database:** MariaDB (Docker)

---

## Database Schema

### `Customers` Table
| Field     | Type      | Null | Key | Default             | Extra                         |
|-----------|----------|------|-----|----------------------|-------------------------------|
| id        | int(11)   | NO   | PRI | NULL                | auto_increment                |
| name      | text      | YES  | UNI | NULL                |                               |
| email     | text      | YES  |     | NULL                |                               |
| createdAt | timestamp | YES  |     | current_timestamp() |                               |
| updatedAt | timestamp | YES  |     | current_timestamp() | on update current_timestamp() |

### `Tasks` Table
| Field          | Type      | Null | Key | Default             | Extra                         |
|----------------|----------|------|-----|----------------------|-------------------------------|
| id             | int(11)   | NO   | PRI | NULL                | auto_increment                |
| parentId       | int(11)   | YES  | MUL | NULL                |                               |
| customerId     | int(11)   | YES  |     | NULL                |                               |
| name           | text      | YES  |     | NULL                |                               |
| description    | text      | YES  |     | NULL                |                               |
| plannedEndDate | text      | YES  |     | NULL                |                               |
| status         | text      | YES  |     | NULL                |                               |
| createdAt      | timestamp | YES  |     | current_timestamp() |                               |
| updatedAt      | timestamp | YES  |     | current_timestamp() | on update current_timestamp() |

### Foreign Key Constraints
| CONSTRAINT_NAME | UPDATE_RULE | DELETE_RULE | TABLE_NAME | REFERENCED_TABLE_NAME |
|-----------------|-------------|-------------|------------|-----------------------|
| fk_parent       | RESTRICT    | CASCADE     | Tasks      | Tasks                 |

The foreign key `fk_parent` ensures that when a parent task is deleted, all its child tasks (where `parentId` references the parent) are also automatically deleted due to the `CASCADE` rule.

---

## Features
- **Customer Management:** Create, read, update, and delete customers.
- **Task Management:** Nested task structure allowing for parent-child relationships.
- **Status Tracking:** Track planned end dates and statuses of tasks.
---

## Installation

### Prerequisites
- Docker
- Node.js & Angular CLI
- Java Development Kit (JDK)
- Gradle

### Steps
1. **Clone the repository:**
   ```bash
   https://github.com/Kwwezz/prz-java-project-1
   cd dashboard-app
   ```

2. **Start MariaDB in Docker:**
   ```bash
   docker run -d -p 3306:3306 --name mariadb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=dashboard mariadb
   ```
3. **Create the 'dashboard' Database (if not already created):**

   ```sql
   CREATE DATABASE dashboard;
   ```
4. **Import the Database Schema:**
   ```bash
   mariadb -h 127.0.0.1 -P 3306 -u root -p dashboard < backup_dashboard.sql
   ```
    

5. **Backend (Spring Boot):**
   ```bash
   cd backend
   ./gradle bootRun
   ```

6. **Frontend (Angular):**
   ```bash
   cd frontend
   npm install
   npm run start
   ```

---

## Usage
- Access the application at `http://localhost:4200`
- API is available at `http://localhost:8080`

---
