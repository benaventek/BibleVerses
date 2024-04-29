import verseRoutes from './verses.js';

const constructorMethod = (app) => {
  app.use('/', verseRoutes);
  app.use('/chapters', verseRoutes);
  app.use('/search', verseRoutes);
  app.use('/get-random-verse', verseRoutes);
  app.use('/get-verse', verseRoutes);
  app.use('/get-chapter', verseRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

export default constructorMethod;
