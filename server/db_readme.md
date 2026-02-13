# Student Database (MongoDB) — Developer Guide

## Overview
This project uses MongoDB to store student records.  
All database initialization and schema definitions are handled inside:

**server/db.js**

This file connects to the MongoDB cluster and exports models for use across the backend.

---

## Database Credentials

**MongoDB Cluster URL**  
mongodb+srv://25mx356_db_user:y63o22CHUag4NVry@cluster0.yze0vyg.mongodb.net/zepodb

**Database Name**  
zepodb

**Primary Collection**  
students

Note: Credentials are for development use only. Do not change the connection string without informing the backend team.

---

## Student Collection Structure

**Fields Stored**
- rollNo (auto-generated, unique, immutable)
- name
- dob
- department
- batchYear

**Roll Number Format**
```

psg001
psg002
psg003

````

Roll number is generated automatically and cannot be edited after creation.

---

## Backend Usage

### Import Model
```js
const { Student } = require("../db");
````

### Create New Student

Do not send roll number from frontend.

```js
await Student.create({
  name: "Vignesh",
  dob: "2004-02-12",
  department: "MCA",
  batchYear: "2026"
});
```

MongoDB automatically assigns:

```
psg001  
psg002  
psg003  
```

---

## Developer Rules

* Never manually set `rollNo`
* Do not edit `rollNo` after creation
* Always import models from `../db`
* Use MongoDB only through `server/db.js`
* Do not create separate MongoDB connections
* Use this collection only for student-related features

---

## Server Initialization Requirement

MongoDB must initialize once when the server starts.

Add this in the main server file:

```js
require("./db");
```

### Run Server

```
npm start
```

### Expected Console Output

```
MongoDB main cluster connected  
Server running on 5000
