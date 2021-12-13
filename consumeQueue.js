const { ServiceBusClient, delay } = require("@azure/service-bus");

const connectionString = "Endpoint=sb://sb-yield-service-bus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=9qUsUaCnFcbvmU0mmNWScTfH9oWDIV4XxZeKo11y+ck="

const queueName = "sbq-yield-service-bus-queue"
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const consumeQueue = async() => {
    // create a Service Bus client using the connection string to the Service Bus namespace
	const sbClient = new ServiceBusClient(connectionString);

	// createReceiver() can also be used to create a receiver for a subscription.
	const receiver = sbClient.createReceiver(queueName);
    const myMessages =   await receiver.receiveMessages(1);
    let response = ""
    if (myMessages.length===1){
        response = myMessages[0].body
		await receiver.completeMessage(myMessages[0]);
    }
    else{
        response = "Queue is empty"
    }
    return response
	// function to handle messages
	// const myMessageHandler = async (messageReceived) => {
	// 	console.log(`Received message: ${messageReceived.body}`);
	// };

	// // function to handle any errors
	// const myErrorHandler = async (error) => {
	// 	console.log(error);
	// };

	// // subscribe and specify the message and error handlers
	// receiver.subscribe({
	// 	processMessage: myMessageHandler,
	// 	processError: myErrorHandler
	// });

	// // Waiting long enough before closing the sender to send messages
	// await delay(20000);

	// await receiver.close();	
	// await sbClient.close();
}

module.exports = { consumeQueue }