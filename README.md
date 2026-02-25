# AUGMET Moodle Dashboard & Theme Enhancements

## Overview

This project implements custom UI and UX enhancements for the **AUGMET Moodle platform**.

The implementation introduces:

- A Dashboard Course Progress widget with a pie chart and animated progress bars  
- A Welcome Video Tour modal displayed to first-time users  
- A Login Support link with an auto-prefilled support message  
- Automatic opening of the Course Index drawer after login  
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

### 2. Welcome Video Tour Modal

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

### 3. Login Support & Drawer Script

Enhances the login and support experience and improves navigation usability.

**Adds:**

- “Need help? Contact Support” link on the login page
- Custom subtitle on the support page
- Auto-prefilled support message text
- Automatically opens the Course Index drawer after login

**File:**

src/scripts/login-support-and-drawer.js

**Deployment Path:**

Site administration -> Appearance -> Additional HTML -> Before BODY is closed


---

### 4. Theme Customization (Raw SCSS)

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
│   └── dashboard-video-tour.html
├── scripts/
│   └── login-support-and-drawer.js
└── styles/
    └── custom-theme.scss




