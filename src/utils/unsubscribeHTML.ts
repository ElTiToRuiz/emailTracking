// This template is a simple HTML page that displays a message to the user that they have successfully unsubscribed from the email tracking system.

export const unsubscribeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribed Successful</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f4f4f4;
            text-align: center;
        }
        .container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
        }
        h1 {
            font-size: 24px;
            color: #333;
        }
        p {
            font-size: 16px;
            color: #666;
            margin: 15px 0;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #007bff;
            color: #fff;
            text-decoration: none;
            font-size: 14px;
            border-radius: 5px;
            transition: background 0.3s;
        }
        .button:hover {
            background: #0056b3;
        }
        .icon {
            font-size: 50px;
            color: #28a745;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="icon">✅</div>
        <h1>You Have Successfully Unsubscribed</h1>
        <p>You will no longer be tracked in our emails.</p>
        <a href="https://app.zyroex.com" class="button">Return to Homepage</a>
    </div>

</body>
</html>
`