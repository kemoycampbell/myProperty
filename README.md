# PROJECT Design Documentation

<div align="center">
    <h2>🚀 Project Status</h2>
    <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
        <div>
            <h4>GitHub Build Status</h4>
            <a href="https://github.com/kemoycampbell/myProperty/actions/workflows/ci.yaml">
                <img src="https://github.com/kemoycampbell/myProperty/actions/workflows/ci.yaml/badge.svg" alt="GitHub Actions Build">
            </a>
        </div>
        <div>
            <h4>Coverage Status</h4>
            <a href="https://app.codecov.io/gh/kemoycampbell/myProperty">
                <img src="https://codecov.io/gh/kemoycampbell/myProperty/branch/main/graph/badge.svg" alt="Coverage Status">
            </a>
        </div>
        <div>
            <h4>Code Quality Status</h4>
            <a href="https://sonarcloud.io/summary/overall?id=kemoycampbell_myProperty&branch=main">
                <img src="https://sonarcloud.io/api/project_badges/measure?project=kemoycampbell_myProperty&metric=alert_status" alt="Code Quality Status">
            </a>
        </div>
        <div>
            <h4>License</h4>
            <a href="https://www.gnu.org/licenses/agpl-3.0">
                <img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL v3">
            </a>
        </div>
    </div>
</div>

## Team Information
* Team name: Bnbz
* Team members
  * Kemoy Campbell
  * Jose Palomino
  * Michael Ogunwale
  * Michael Berrios
  * Geoffrey Tse

## Executive Summary

### Problem Statement
Property managers who own or oversee multiple rental properties often struggle with keeping track of unit availability, tenant information, lease agreements, and maintenance requests. Managing these tasks manually or through disjointed systems leads to inefficiencies, miscommunication, and delays in resolving tenant issues. Tenants also lack a centralized platform to access key apartment details, submit maintenance requests, and track their resolution status.

### Proposed Solution
A streamline platform that provides an all-in-one solution for property managers to efficiently oversee their rental properties. Platform capabilities includes:
- **Unit Tracking**: Monitor the status of each property (occupied, available, or under maintenance).
- **Centralized Document Management**: Store and retrieve leases, payment proofs, maintenance records, and other important files.
- **Tenant Portal**: Enable tenants to access apartment rules, emergency contacts, and submit maintenance requests with descriptions and images.
- **Maintenance Request Tracking**: Maintain a transparent timeline for reported issues, status updates, and resolutions.
- **Secure Role-Based Access**: Ensure property managers and tenants have appropriate access through a secure login system.


## Requirements

This section describes the features of the application.

### Definition of MVP
The Minimum Viable Product (MVP) is a web-based platform that allows property managers to efficiently manage rental properties, tenants, lease agreements, and maintenance requests. It provides a centralized dashboard to track unit availability, tenant interactions, payment statuses, and maintenance progress. The platform ensures data security through authentication, access control, and encryption, while also offering dedicated portals for property managers, owners, tenants, and maintenance staff to access relevant features and submit requests.

| Feature                            | Description |
|------------------------------------|-------------|
| **Owner Login**                    | Allows property owners to securely log in and access a dashboard showing the status of their rental units. |
| **Tenant Account Creation**        | Property owners can create accounts for tenants, who receive email invitations and can view relevant property information. |
| **Unit Status Tracking**           | Provides a dashboard where property owners can view, filter, and sort the status of all their rental units. |
| **Emergency Contact Management**   | Tenants can add, edit, delete, and view their emergency contacts to keep the information up to date. |
| **Document Upload**                | Property owners can securely upload sensitive documents, ensuring they are only accessible to authorized users. |
| **Maintenance Operator Work Orders** | Maintenance operators can access work orders, start and complete tasks. |
| **Completed Work Order Review**    | Maintenance managers can review and confirm completed work orders before officially closing them. |
| **Tenant Login**                   | Tenants can securely log in and access a dashboard with key apartment details like rules and emergency contacts. |
| **Maintenance Request Submission** | Tenants can submit maintenance requests, attach images if needed, and track the status of their requests. |
| **Current Balance and Upcoming Payments** | Tenants can view their current balance and upcoming payments. |


### MVP Features
#### Owner and Property Management

| **Feature**               | **User Story**                                                                 | **Acceptance Criteria**                                                                                                                                               |
|---------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Owner Login**            | As a property owner, I want to log in securely to the application so that I can access a dashboard where I can view the status of all my rental units.                | - Login with username/password                                                                                                                                       |
|                           |                                                                                 | - View all rental units with unit ID, tenant name, and current status (e.g., occupied, vacant, maintenance needed)                                                  |
| **Tenant Account Creation**| As a property owner, I want to create accounts for my tenants letting them see different property information so that they can be informed.                           | - Ability to create tenant accounts with unique credentials                                                                                                          |
|                           |                                                                                 | - Assign tenant accounts to specific rental units                                                                                                                    |
|                           |                                                                                 | - Provide tenants access to property details such as rules, emergency contacts, and building info                                                                   |
| **Unit Status Tracking**   | As a property owner, I want to track the status of each of my units so that I can easily see which units need my attention.                                          | - View all units with their current status (e.g., occupied, vacant, under maintenance)                                                                               |
|                           |                                                                                 | - Filter units by status or tenant name                                                                                                                                 |
| **Document Upload**        | As a property owner, I want to securely upload documents, ensuring they are only accessible to me and the associated tenant(s).                                      | - Document upload                                                                                                                                                    |
|                           |                                                                                 | - Organize documents by tenant or unit                                                                                                                                |


#### Tenant
| **Feature**                           | **User Story**                                                                 | **Acceptance Criteria**                                                                                                                                               |
|---------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Tenant Login**                      | As a tenant, I want to log in securely to the application so that I can access a dashboard where I can view key details about my apartment, such as rules, emergency contacts, and maintenance request tools. | - Login with username/password                                                                                                                                       |
|                                       |                                                                                 | - Access to tenant-specific information (e.g., rules, emergency contacts, maintenance tools)                                                                         |
| **Emergency Contact Management**      | As a tenant, I want to add and update my emergency contact information so that my landlord has accurate and up-to-date details in case of an emergency.                  | - Ability for tenants to update emergency contact details via the portal                                                                                             |
|                                       |                                                                                 | - Storage of emergency contact information                                                                                                                             |
|                                       |                                                                                 | - Access to emergency contacts for property owners in case of emergencies                                                                                             |
| **Maintenance Request Submission**    | As a tenant, I want to submit maintenance requests through the app so that I can report issues with my apartment and track the status of my requests, ensuring that problems are addressed promptly. | - Submit maintenance requests with issue description                                                                                                                 |
|                                       |                                                                                 | - View the status of submitted requests                                                                                                                                 |
| **Current Balance and Upcoming Payments** | As a tenant, I want to be able to see my current balance and upcoming payments so that I can pay my rent on time.                                                     | - View current balance and upcoming payment due dates                                                                                                                 |



#### Maintenance Operations
| **Feature**                           | **User Story**                                                                 | **Acceptance Criteria**                                                                                                                                               |
|---------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Login for Maintenance Manager and Dashboard Access** | As a maintenance manager, I want to log in securely and view job requests on the dashboard, so I can assign work orders to operators.                                  | - Login with username/password                                                                                                                                       |
|                                       |                                                                                 | - View all job requests with request ID, date submitted, sender, and issue description                                                                                |
|                                       |                                                                                 | - Ability to assign/unassign work orders to operators                                                                                                                 |
|                                       |                                                                                 | - Move assigned requests to the "Assigned Work Orders" category                                                                                                      |
| **Login for Maintenance Operator and Work Order Management** | As a maintenance operator, I want to log in securely and manage work orders, so I can complete tasks and submit photos.                                                | - Login with username/password                                                                                                                                       |
|                                       |                                                                                 | - View assigned work orders with request ID, date assigned, sender, address, and issue description                                                                  |
|                                       |                                                                                 | - Ability to start a work order and move it to “In Progress Work Orders”                                                                                             |
|                                       |                                                                                 | - Upload and submit photos for each work order                                                                                                                        |
|                                       |                                                                                 | - Mark work order as complete and move it to the "Completed Work Orders" category                                                                                   |
| **Review and Close Completed Work Orders** | As a maintenance manager, I want to review completed work orders and close them once confirmed, ensuring tasks are properly finished.                                   | - Login with username/password                                                                                                                                       |
|                                       |                                                                                 | - View all work orders (in progress and completed)                                                                                                                    |
|                                       |                                                                                 | - Review work orders with request ID, issue description, status, operator, completion date, and submitted photos                                                     |
|                                       |                                                                                 | - Close work orders once confirmed as completed                                                                                                                       |


## Architecture and Design
This section describes the application architecture.

### Software Architecture

#### Software Architecture Pattern: Model-View-Controller (MVC)

The application follows the **Model-View-Controller (MVC)** architecture design pattern, which separates concerns into three distinct components.

#### High-Level Workflow
1. The user use their device to interacts with the view.
2. The controller processes the request, offloads it to the appropriate service for validation, and communicates with the model.
3. The model queries or updates the database and returns a response.
4. The controller sends the response back to the view, and the UI is updated accordingly.

![This is an image of the architecture](images/architecture.png "Architecture Diagram")

#### Components and their responsibilities:

1. **Model**
   - Represents the application's data.
   - Interacts with the data source to fetch, retrieve, update, or delete data.

2. **Controller**
   - Acts as the intermediary between the model and the view.
   - Handles all requests and forwards them to the appropriate service, which contains the business logic.
   - Returns the request data.
   - Notifies the model and view of any changes in data.

3. **View**
   - The user interacts with the application through this UI.
   - Displays information received from the controller.




### Use Cases
![This is an image of the use cases](images/usecases.png "Use Cases")