# bun

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.0.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime. 
You shold use the CSV File that upload with project
<h1>CHALLENGE DESCRIPTION
<h1>
  Bun.js provides the fastest SQLite in the JavaScript ecosystem. It natively implements a high-performance SQLite3 driver. To accomplish the exercise, you are expected to use the SQLite API in bun.js.

<h2>PROBLEM STATEMENT 
</h2>
A Request Management System processes multiple types of requests through the application.<br/> Each request has information that is different from another one. To accommodate this data management issue, the data architects designed the schema wherein a column in the table named “RequestData” stored all request-specific data as a JSON payload.<br/> The new schema is based on the types of the requests and is as shown below:
![image](https://github.com/MOHAMMAD-ALSUBAIE/solutins-42-task/assets/68867495/a1f46451-c25a-42cb-b42b-bf0a091e6f95)


However, the product team wants to collect statistics that are based on the details inside <br> the RequestData column which are currently not possible because of the structure of the table. The new schema is based on the types of the requests and is as shown below:

![image](https://github.com/MOHAMMAD-ALSUBAIE/solutins-42-task/assets/68867495/eed97461-e1cd-49ce-891b-6fb5123c4c29)


<h2>REQUEST DETAILS
</h2>
The request types are explained below for reference to be used in the task

![image](https://github.com/MOHAMMAD-ALSUBAIE/solutins-42-task/assets/68867495/01571c75-b002-420d-98b4-4edf6d06067a)


<h2>DATA FILE 
</h2>
The CSV file to be used as a test file can be downloaded from the link: <a herf="">[LINK]<a/>

<h2>TASK DETAILS</h2>

<h3>The main requirements for this exercise to be accomplished is:</h3>

   - Analyze the provided CSV file to figure out the Schema for the RequestData field for the different types of Requests
   - Update the above entity model with details of each Request Type table
   - Create an API that allows the user to upload the CSV file that will be received by the backend to do the processing and inserting the data in its rightful table in the database.   
   - Once all the records are added to the resultant tables, provide a summary of the import process to the front-end
   - Display the number of records for each type that were imported and the total time it took to import the complete dataset into the database. 

