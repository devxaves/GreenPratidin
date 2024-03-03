import { orkesConductorClient, WorkflowExecutor } from "@io-orkes/conductor-javascript";
    
async function runWorkflow() {
  const client = await orkesConductorClient({
    TOKEN: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtqbVlNWThEV2VOU1lKZmZSSjFXNSJ9.eyJnaXZlbl9uYW1lIjoiREVWeCBBVkVTIiwibmlja25hbWUiOiJkZXZ4YXZlcyIsIm5hbWUiOiJERVZ4IEFWRVMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTEhYck1xcWlrRV8wMXV4aC1CamRiQ01WYnZfNS1NOElyQXNWVWsxQlROUGc9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDI0LTAzLTAzVDA0OjEyOjEzLjY3NloiLCJlbWFpbCI6ImRldnhhdmVzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGgub3JrZXMuaW8vIiwiYXVkIjoiVzZuejBES1BWck5hSHliQ2xWY2NIQzdHOEJ5TU1aRDQiLCJpYXQiOjE3MDk0MzkxMzMsImV4cCI6MTcwOTQ3NTEzMywic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTUxOTkxMjgxMDcxNzM5ODE3NjkiLCJzaWQiOiJtMHc2LWtKN0MzTHEyUzBwV0xqOFJXcjJWcHZoRVdSVCIsIm5vbmNlIjoiVUd0YVJGWm5WV0ZrVUMxeE1YWjFUMDVNWjNKRk5qQmpZMFJCVTE5elZqZFNVWEpxZVdjMmNFSTVhUT09In0.EIh6_16kFuHZ8pCMm-4eryuiUGLhSmK91gmCEHlsVZh5v9-Sl-Gidos34_WJ4Y4y5tQFfVY-igYb2c7qjKFnw0g880ebcDzuGWYSgyXw_mYFij38swYHCQk6hqwoaJ8d7r9m2-fOV4Xv-JMrWE76UbcZIO5YrqhFmurKk0uGtsA4cS2ePr4kU8xp1DWoCsjn0l8zmJBH1r4dzZg9BoNlSKYVJvO2gMbVtJztYg2fJPZY68EOn97KKfH4zV46MFpulwxZd0J5mUUjA80NXeU-H_0OrxhaQDn5pEabNJugtGJd5VafkeIOPyRtwePX1vVs52J1byricSBMJBGk-Pas6w",
    serverUrl: "https://play.orkes.io/api"
  });
  const executor = new WorkflowExecutor(client);

  const data = {
    name: "green_pdf",
    version: "1",
    input: {},
    correlationId: "",
    idempotencyKey:"",
  };

  const result = await executor.startWorkflow(data);
      
  return result;
}
  
runWorkflow();
      