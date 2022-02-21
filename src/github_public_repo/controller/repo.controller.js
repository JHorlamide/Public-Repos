const axios = require('axios')

// Make a request to the GitHub API and return the list
// of repos that matches the search parameters.
const makeSearch = async ({
  searchQuery,
  currentPage,
  itemPerPage,
  sortField,
  sortOrder,
}) => {
  const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

  const url = `https://api.github.com/search/code?q=${searchQuery}+in:file&page=${currentPage}&per_page=${itemPerPage}&sort=${sortField}&order=${sortOrder}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`

  const config = {
    headers: {
      Authorization: `Token ${GITHUB_API_TOKEN}`,
    },
  }

  return await axios.get(url, config)
}

/***
 * @router  GET: api/get-repos/:searchQuery/:sortField/:sortOrder/:itemPerPage/:currentPage
 * @desc    Get github repos that matches search parameters.
 * @access  ACCESS_TYPE(Public || Private).
 * ***/
exports.getRepos = async (req, res) => {
  const requestParams = {
    searchQuery: req.params.searchQuery,
    sortField: req.params.sortField,
    sortOrder: req.params.sortOrder,
    itemPerPage: req.params.itemPerPage,
    currentPage: req.params.currentPage,
  }

  try {
    const result = await makeSearch(requestParams)

    if (
      result.data.incomplete_results === false &&
      result.data.items.length > 0
    ) {
      return res.status(200).json(result.data.items)
    }
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
}