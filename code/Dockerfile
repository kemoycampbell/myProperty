#use Node as the base image
FROM node:18-alpine

#set the working directory
WORKDIR /app

#Copy the package.json and package-lock.json files
COPY package.json  ./

#Install the dependencies
RUN npm install


# copy the rest of the projects
COPY . .

#Expose the port 5173
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev", "--", "--host"]
