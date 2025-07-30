const app = require('./App');
const { db } = require('./config/db');

const PORT = process.env.PORT || 3000;
db().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
