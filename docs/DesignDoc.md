
# PROJECT Design Documentation

> _The following template provides the headings for your Design
> Documentation.  As you edit each section make sure you remove these
> commentary 'blockquotes'; the lines that start with a > character
> and appear in the generated PDF in italics._

## Team Information
* Team name: TEAMNAME
* Team members
  * Kemoy Campbell
  * Jose Palomino
  * Michael Ogunwale
  * Michael Berrios

## Executive Summary

### Problem Statement
Property managers who own or oversee multiple rental properties often struggle with keeping track of unit availability, tenant information, lease agreements, and maintenance requests. Managing these tasks manually or through disjointed systems leads to inefficiencies, miscommunication, and delays in resolving tenant issues. Tenants also lack a centralized platform to access key apartment details, submit maintenance requests, and track their resolution status.

### Proposed Solution
A streamline platform that provides an all-in-one solution for property managers to efficiently oversee their rental properties. Platform capabilities includes:
- **Real-Time Unit Tracking**: Monitor the status of each property (occupied, available, or under maintenance).
- **Centralized Document Management**: Store and retrieve leases, payment proofs, maintenance records, and other important files.
- **Tenant Portal**: Enable tenants to access apartment rules, emergency contacts, and submit maintenance requests with descriptions and images.
- **Maintenance Request Tracking**: Maintain a transparent timeline for reported issues, status updates, and resolutions.
- **Secure Role-Based Access**: Ensure property managers and tenants have appropriate access through a secure login system.
- **Building-Wide Management**: Provide information on shared spaces, security features, and community updates.


## Requirements

This section describes the features of the application.

### Definition of MVP
The Minimum Viable Product (MVP) is a web-based platform that allows property managers to efficiently manage rental properties, tenants, lease agreements, and maintenance requests. It provides a centralized dashboard to track unit availability, tenant interactions, payment statuses, and maintenance progress. The platform ensures data security through authentication, access control, and encryption, while also offering dedicated portals for property managers, owners, tenants, and maintenance staff to access relevant features and submit requests.

### Definition of MVP
*Secure Owner Login*
  * Allows property owners to securely log in and access a dashboard showing the status of their rental units.

*Tenant Account Creation*
  * Property owners can create accounts for tenants, who receive email invitations and can view relevant property information.

*Strong Security Features*
  * Implements strong password policies and encryption to protect sensitive tenant and property information.

*Unit Status Tracking*
  * Provides a dashboard where property owners can view, filter and sort the status of all their rental units.

*Late Rent Payment Summary*
  * Display a detailed summary of late rent payments, overdue dates and outstading charges for each tenant.

*Emergency Contact Management*
  * Tenants can add, edit, delete and view their emergency contacts to keep the information up to date.

*Secure Document Upload*
  * Property owners can securely upload sensitive documents, ensuring they are only accessible to authorized users.

*Two Factor Authentication (2FA)*
  * Users can enable 2FA on their accounts for an extra layer of security against unauthorized access.

*Common Area Booking*
  * Property owners can reserve common areas for events, check for conflicts and notify tenants about the reservations.

*Tenant Portal Access*
  * Tenants can access the portal to view common area schedules, building maps and register for events.

*Maintenance Operator Work Orders*
  * Maintenance operators can access work orders, start/completing tasks.

*Completed Work Order Review*
  * Maintenance managers can review and confirm completed work orders before officially closing them.

*Secure Tenant Login*
  * Tenants can securely log in and access a dashboard with key apartment details like rules and emergency contacts.

*Maintenance Request Submission*
  * Tenants can submit maintenance requests, attach images if needed and track the status of their requests.

*Rent Payment History*
  * Tenants can view their rent payment history and receive reminders about due dates and late fees.

*Current Balance and Upcoming Payments*
  * Tenants can view their current balance and upcoming payments, including due dates and amounts along with reminders.

### MVP Features
# Owner and Property Management

## Secure Owner Login
* As a property owner, I want to log in securely to the application so that I can access a dashboard where I can view the status of all my rental units.
  * Secure login with username/password
  * 2FA login if enabled
  * View all rental units with unit ID, tenant name, and current status (e.g., occupied, vacant, maintenance needed)

---

*Secure Owner Login* - 
  * As a property owner
I want to be able to log in to the application securely
so that I can access a dashboard where I can view the status of all my rental units.

*Tenant Account Creation*
  * As a property owner
I want to be able to create accounts for my tenants letting them see the different information of the property
so that they can be informed.

*Strong Security Features*
  * As a property owner
I want the applications to have strong security features
So that tenant and property information are protected.

*Unit Status Tracking*
  * As a property owner
I want to track the status of each of my units 
so that I can easily see which units need my attention.

*Late Rent Payment Summary*
  * As a property owner
I want to view a detailed summary of late rent payments, overdue dates, and total outstanding charges for each tenant
so that I can accurately collect the correct amount due

*Emergency Contact Management*
  * As a tenant
	I want to add and update my emergency contact information 
so that my landlord has accurate and up-to-date details in case of an emergency

*Secure Document Upload*
  * As a property owner
I want to securely upload and encrypt documents, ensuring they are only accessible to me and the associated tenant(s), 
so that sensitive information remains protected and private

*Two Factor Authentication (2FA)*
  * As a user
	I want to enable two-factor authentication (2FA) on my account 
so that my account is protected from unauthorized access

*Common Area Booking*
  * As property owner
	I want to reserve specific areas of the building for events that can run from designated	
	times of day
So that tenants can be notified when specific areas are reserved

*Tenant Portal Access*
  * As a tenant
I want to be able to access the portal 
so that I can view general building info, such as 
common area schedules, complex maps, and possible events the complex is hosting.

*Maintenance Operator Work Orders*
  * As a maintenance manager
I want to be able to log in securely and access the dashboard displaying all job requests from tenants and owners

*Completed Work Order Review*
  * As a maintenance operator
I want to be able to log in securely and access work orders
so that I can accept and complete work orders, and submit photos.

*Secure Tenant Login*
  * As a tenant
I want to be able to log in to the application securely
so that I can access a dashboard where I can view key details about my apartment, such as rules, emergency contacts and maintenance request tools.

*Maintenance Request Submission*
  * As a tenant
I want to submit maintenance requests through the app 
so that I can report issues with my apartment and track the status of my requests, ensuring that problems are addressed promptly.

*Rent Payment History*
  * As a tenant
I want to view my rent payment history and receive reminders about upcoming due dates or late fees through the app
so that I can stay on top of my payments and avoid any confusion.

*Current Balance and Upcoming Payments*
  * As a tenant
I want to be able to see my current balance and upcoming payments
so that I can pay my rent on-time.

#### Maintenace Operations
*Secure Login for Maintenance Manager and Dashboard Access*
* As a maintenance manager, I want to log in securely and view job requests on the dashboard, so I can assign work orders to operators
  * Secure login with username/password
  * 2FA login if enabled
  * View all job requests with request ID, date submitted, sender, and issue description
  * Ability to assign/unassign work orders to operators
  * Move assigned requests to the "Assigned Work Orders" category

*Secure Login for Maintenance Operator and Work Order Management*
* As a maintenance operator, I want to log in securely and manage work orders, so I can complete tasks and submit photos
  * Secure login with username/password
  * 2FA login if enabled
  * View assigned work orders with request ID, date assigned, sender, address, and issue description
  * Ability to start a work order and move it to “In Progress Work Orders.
  * Upload and submit photos for each work order
  * Mark work order as complete and move it to the "Completed Work Orders" category

*Review and Close Completed Work Orders*
* As a maintenance manager, I want to review completed work orders and close them once confirmed, ensuring tasks are properly finished
  * Secure login with username/password
  * 2FA login if enabled
  * View all work orders (in progress and completed)
  * Review work orders with request ID, issue description, status, operator, completion date, and submitted photos
  * Close work orders once confirmed as completed

## Architecture and Design
This section describes the application architecture.

### Software Architecture
![This is an image of the architecture](images/architecture.png "Architecture Diagram")

> _Describe your software architecture._
The diagram display an high level view of the platform
This project is setup using the Model View Controller (MVC) architecture pattern.


### Use Cases
![This is an image of the use cases](images/usecases.png "Use Cases")
> _Describe your use case diagram._

