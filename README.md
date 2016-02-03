# Notman Events Dashboard Frontend

This is the front-end for the calendar events dashboard.

It uses the `notman-server-api` to fetch events.

It can be run as a digital signage screen, for instance on a Raspberry Pi or a
ChromeOS device.

It uses the API to get the correct time in in the right timezone, so clock and
\timezone settings don't need to be configured on the device.

## To run the dev server

```
npm install
npm start
```

## To build

`npm run build`

The resulting build will be in `build` and can be served directly from that
directory.

## Deploy

It's suggested to push it to a static web host location like AWS S3. To do that,
fill in the environment variables needed (the AWS credentials and the name of
the S3 bucket.

Create a file called `.env` in the root of the project, in this format:

```
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxx
AWS_S3_BUCKET=xxxxxxxxxxxxxx
```

Then initiate the push using the `s3_website` tool.

`s3_website push`

Alternatively, it can be served locally by the digital signage device, but that
makes it less convenient to push updates to it. The device needs an internet
connection in either case, to fetch the event data.
