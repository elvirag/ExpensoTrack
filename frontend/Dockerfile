# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

COPY --chown=node:node package.json .
RUN npm install

COPY --chown=node:node . .
USER node


# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the React application
CMD ["npm", "start"]
