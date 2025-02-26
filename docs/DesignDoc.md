
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
  * MEMBER3
  * MEMBER4

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
*Secure Owner Login*
  * As a property owner
I want to be able to log in to the application securely
so that I can access a dashboard where I can view the status of all my rental units.



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

