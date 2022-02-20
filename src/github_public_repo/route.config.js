const getRepoController = require('./controller/repo.controller')

exports.routeConfig = function (app) {
  app.get(
    '/get-repos/:searchQuery/:sortField/:sortOrder/:itemPerPage/:currentPage',
    [getRepoController.getRepos],
  )
}
