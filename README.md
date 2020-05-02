# Fitness Anywhere API

> ## https://fitness-anywhere.herokuapp.com/

# Auth
`Testing users:`
|               | username       | password     |
--------------- | -------------- | ------------ |
**instructor**  | testinstructor | test123      |
**client**      | testclient     | test123      |

## - Instructor and Client register and login routes

>### POST /api/auth/instructors/register
>### POST /api/auth/clients/register
```
Expects:
{
    username: <string>,
    password: <string>,
    first_name: <string>,
    last_name: <string>,
    email: <string>,
    phone: <string> // (Optional)
}
```
```
Returns:
{
    "id": <integer>
    "username": <string>
}
```
<br />

>#### POST /api/auth/instructors/login
>#### POST /api/auth/clients/login
```
Expects:
{
    username: <string>
    password: <string>
}

Returns:
{
    "token": <string>,
    "id": <integer>
}
```
<br />

> ## All the following routes require **`token`**

# Classes routes

## - Return all classes
>#### GET /api/classes/
```
Returns:
[
    {
        "id": <integer>,
        "instructor_id": <integer>,
        "name": <string>,
        "type": <string>,
        "start_time": <string>, // format: "2020-05-02 07:00"
        "location": <string>,
        "intensity": <string>, // enum type: ['1','2','3','4','5']
        "status": <string>, // enum type: ['CONFIRMED','CANCELED']
        "price": <decimal>,
        "description": <string> || null,
        "duration": <integer> || null, // minutes
        "max_class_size": <integer> || null
    },
    ...
]
```
<br />

## - Return specific class
>#### GET /api/classes/:id
```
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <decimal>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
}
```
<br />

## - Return intructor from specific class
>#### GET /api/classes/:id/instructor
```
Returns:
{
    "id": <integer>,
    "username": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone": <string> || null
}
```
<br />

## - Return clients from specific class
>#### GET /api/classes/:id/clients
```
[
    {
        "id": <integer>,
        "username": <string>,
        "first_name": <string>,
        "last_name": <string>,
        "email": <string>,
        "phone": <string> || null
    },
    ...
]
```
<br />

# Instructors routes
## - Return all instructors
>#### GET /api/instructors
```
Returns:
[
    {
        "id": <integer>,
        "username": <string>,
        "password": <string>,
        "first_name": <string>,
        "last_name": <string>,
        "email": <string>,
        "phone": <string> || null
    },
    ...
]
```
<br />

## - Return instructor by ID
>#### GET /api/instructors/:id
```
Returns:
{
    "id": <integer>,
    "username": <string>,
    "password": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone": <string> || null
}
```
<br />

> ## All the following routes require **`instructor token`**

## - Update instructor
>#### PUT /api/instructors/:id/
```
Expects:
{
    username: <string>,
    first_name: <string>,
    last_name: <string>,
    email: <string>,
    phone: <string> // (Optional)
}
```
```
Returns:
{
    "id": <integer>,
    "username": <string>,
    "password": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone":  || null
}
```
<br />

## - Delete instructor
>#### DELETE /api/instructors/:id/
```
Returns:
{
    "message": "Instructor removed successfully"
}
```
<br />

## - Return instructor's classes
>#### GET /api/instructors/:id/classes
```
Returns:
[
    {
        "id": <integer>,
        "instructor_id": <integer>,
        "name": <string>,
        "type": <string>,
        "start_time": <string>, // format: "2020-05-02 07:00"
        "location": <string>,
        "intensity": <string>, // enum type: ['1','2','3','4','5']
        "status": <string>, // enum type: ['CONFIRMED','CANCELED']
        "price": <integer>,
        "description": <string> || null,
        "duration": <integer> || null, // minutes
        "max_class_size": <integer> || null
    },
    ...
]
```
<br />

## - Add new class
>#### POST /api/instructors/:id/classes
```
expects:
{
    name: <string>,
    type: <string>,
    start_time: <string>, // format: "2020-05-02 07:00"
    location: <string>,
    intensity: <string>, // enum type: ['1','2','3','4','5']
    status: <string>, // enum type: ['CONFIRMED','CANCELED']
    price: <integer>,
    description: <string>, (Optional)
    duration: <integer>, (Optional) // minutes
    max_class_size: <integer> (Optional)
    image_url: <string> (Optional)
}
```
```
returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
    "image_url": <string> || null
}
```
<br />

## - Return instructor's specific class
>#### GET /api/instructors/:id/classes/:class_id
```
returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
    "image_url": <string> || null
}
```
<br />

## - Update class
>#### PUT /api/instructors/:id/classes/:class_id
```
expects:
{
    name: <string>,
    type: <string>,
    start_time: <string>, // format: "2020-05-02 07:00"
    location: <string>,
    intensity: <string>, // enum type: ['1','2','3','4','5']
    status: <string>, // enum type: ['CONFIRMED','CANCELED']
    price: <integer>,
    description: <string>, (Optional)
    duration: <integer>, (Optional) // minutes
    max_class_size: <integer> (Optional)
    image_url: <string> (Optional)
}
```
```
returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
    "image_url": <string> || null
}
```
<br />

## - Delete class
>#### DELETE /api/instructors/:id/classes/:class_id
```
returns:
{
    "message": 'Class successfully deleted'
}
```
<br />

## - Return clients from specific class
>#### GET /api/instructors/:id/classes/:class_id/clients
```
returns:
[
    {
        "id": <integer>,
        "username": <string>,
        "first_name": <string>,
        "last_name": <string>,
        "email": <string>,
        "phone": <string> || null
    },
    ...
]
```
<br />

# Clients routes

> ## All the following routes require **`client token`**

## - Return all clients
>#### GET /api/clients
```
Returns:
[
    {
        "id": <integer>,
        "username": <string>,
        "password": <string>,
        "first_name": <string>,
        "last_name": <string>,
        "email": <string>,
        "phone": <string> || null
    },
    ...
]
```
<br />

## - Return specific clients
>#### GET /api/clients/:id
```
Returns:
{
    "id": <integer>,
    "username": <string>,
    "password": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone": <string> || null
}
```
<br />

## - Delete client
>#### DELETE /api/clients/:id
```
Returns:
{
    "message": 'Client removed successfully'
}
```
<br />

## - Update client
>#### PUT /api/clients/:id
```
Expects:
{
    username: <string>
    first_name: <string>,
    last_name: <string>,
    email: <string>,
    phone: <string> (Optional)
}
```
```
Returns:
{
    "id": <integer>
    "username": <string>,
    "password": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone": <string> (Optional)
}
```
<br />

## - Return client's classes
>#### GET /api/clients/:id/classes
```
Returns:
[
    {
        "id": <integer>,
        "instructor_id": <integer>,
        "name": <string>,
        "type": <string>,
        "start_time": <string>, // format: "2020-05-02 07:00"
        "location": <string>,
        "intensity": <string>, // enum type: ['1','2','3','4','5']
        "status": <string>, // enum type: ['CONFIRMED','CANCELED']
        "price": <integer>,
        "description": <string> || null,
        "duration": <integer> || null, // minutes
        "max_class_size": <integer> || null,
        "image_url": <string> || null
    },
    ...
]
```
<br />

## - Return specific class
>#### GET /api/clients/:id/classes/:class_id
```
Returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null,
    "image_url": <string> || null
}
```
<br />


## - Register to class
>#### POST /api/clients/:id/classes
```
Expects:
{
    class_id: <integer>
}
```
```
Returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
}
```
<br />

## - Remove class
>#### DELETE /api/clients/:id/classes/:class_id
```
Returns:
{
    "message": 'Class successfully deleted'
}
```
<br />
