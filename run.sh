mvn clean package

java -jar /backend/squidbuilder-0.0.1-SNAPSHOT.jar &

# Start the frontend React application
cd /frontend
npm start

# Wait for all background processes to finish
wait
