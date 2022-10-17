import { DB_LINK } from '@config';

export const dbConnection = {
  url: DB_LINK,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
