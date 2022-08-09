import AppServer from './config/server';

const port = process.env.PORT || 3333;

AppServer.listen(port, () => console.log(`Server running on port ${port}`));
