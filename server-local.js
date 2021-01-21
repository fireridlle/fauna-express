'use strict';

const app = require('./api');

app.listen(process.env.PORT || 3000, () => console.log('Local app listening on port 3000!'));
