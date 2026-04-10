# AUGMET Moodle Dashboard & Theme Enhancements

## Overview

This project implements custom UI and UX enhancements for the **AUGMET Moodle platform**.

The implementation introduces:

- A Dashboard Course Progress widget with a pie chart and animated progress bars  
- A Welcome Video Tour modal displayed to first-time users  
- Automatic opening of the Course Index drawer after login
- Interactive Course Index tooltips and hover effects for improved navigation accessibility
- Conditional Certificate Access Control that gates certificates behind 100% course completion
- Extensive theme customization via Raw SCSS for consistent branding and accessibility  
- Role-based UI control, hiding the dashboard right drawer for non-admin users  

All features are integrated using Moodle’s native customization points:

- **Additional HTML (Before BODY is closed)**
- **Custom Dashboard HTML blocks**
- **Theme Trema – Raw SCSS customization**

---

## Features

### 1. Dashboard Course Progress

Dynamically extracts course progress data from Moodle course cards and renders a visual dashboard summary.

**Displays:**

- Chart (Completed / In Progress / Not Started)
- Individual animated course progress bars
- Clickable course links

**File:**

src/dashboard/dashboard-course-progress.html

**Deployment Path:**

Dashboard -> Turn Editing On -> Add HTML Block

---

### 2. Certificate & Feedback Action Bar

A conditional action container that manages high-stakes rewards and course feedback based on real-time progress validation.

**Displays:**

- Dynamic Certificate Button: Automatically identifies the user's enrolled course and routes the "My Certificate" button to the corresponding activity URL.
- Conditional LinkedIn Integration: The LinkedIn share button remains hidden by default and is only injected into the UI once all assigned courses reach 100% completion.
- LinkedIn Share Integration: Appears only upon completion to allow social sharing of achievements.
- Feedback Link: Provides a quick-access shortcut to the course questionnaire, Hidden by default; automatically appears only when all courses reach 100%.
- Status Gating & Validation: Implements a strict progress-check; if a user attempts to access rewards while courses are in progress, the script blocks the action and triggers a custom   "Completion Required" modal.

**File:**

src/dashboard/dashboard-Certificate.html

src/scripts/scripts.js (JavaScript Logic)

**Deployment Path:**

Dashboard -> Turn Editing On -> Add HTML Block

---

### 3. Welcome Video Tour Modal

Provides a guided onboarding experience for new users by displaying a welcome modal on first login.

**Features:**

- Welcome modal shown only once per user (cookie-based)
- "Play Video" and "Not Now" options
- Persistent Video Tour button available on the dashboard

**File:**

src/dashboard/dashboard-video-tour.html

**Deployment Path:**

Dashboard -> Turn Editing On -> Add HTML Block


---

### 4. Script

Enhances the login and support experience and improves navigation usability.

**Adds:**

- “Need help? Contact Support” link on the login page
- Adds interactive hover highlighting and dynamic tooltips
- Automatically opens the Course Index drawer after login
- Added Certificate 

**File:**

src/scripts/scripts.js

**Deployment Path:**

Site administration -> Appearance -> Additional HTML -> Before BODY is closed


---

### 5. Theme Customization (Raw SCSS)

Provides consistent branding and UI improvements across the Moodle site.

**Includes:**

- Custom styling
- Role-based UI visibility rules

**File:**

src/styles/custom-theme.scss

**Deployment Path:**

Site administration -> Appearance -> Themes -> Trema -> Advanced -> Raw SCSS

---

## Project Structure

```bash
src/
├── dashboard/
│   ├── dashboard-course-progress.html
│   ├── dashboard-Certificate.html     
│   └── dashboard-video-tour.html       
├── scripts/
│   └── scripts.js                      
└── styles/
    └── custom-theme.scss               




