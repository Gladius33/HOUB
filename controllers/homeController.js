export default function getHomePage(req, res) {
  res.render('home', {
    title: 'Welcome on HOUB - the best freelance platform',
    description: 'Welcome on HOUB, the best & ideal platform for freelancers and employers.'
  });
}
