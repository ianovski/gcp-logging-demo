# GCP Logging Demo

## Description
A NodeJS application to demonstrate how to write HTTP Request logs from a backend Express application hosted on a Compute Engine VM to GCP Cloud Logging (AKA Stackdriver)

## Getting Started
### Configuration

Create a `.env` file by copying the preset variable names from `.env-example`
```
cp .env-example .env
```

Use your pre-exising Project ID and Sink name for `PROJECT_ID` and `LOG_NAME`, respectively (The default Sink is `_Default`).

If you want to include the VM instance's name and ID in the logs as well, you can run the following commands from your VM to find them:
```
INSTANCE_NAME=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/hostname)
INSTANCE_ID=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/id)
```

### Start
Install the dependencies and start the server
```
npm i
npm run start
```

ℹ️ : Ensure that the VM service account has the roles `roles/logging.logWriter` and `roles/monitoring.metricWriter`. These are present on the Default Compute Engine service account.
