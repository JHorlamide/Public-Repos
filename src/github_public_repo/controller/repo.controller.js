const axios = require('axios')

const makeSearch = async (apiParams) => {
  const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

  // console.log('From makeSearchFunc: ', apiParams)

  const url = `https://api.github.com/search/code?q=${apiParams.searchQuery}+in:file&page=${apiParams.currentPage}&per_page=${apiParams.itemPerPage}&sort=${apiParams.sortField}&order=${apiParams.sortOrder}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`

  const config = {
    headers: {
      Authorization: `Token ${GITHUB_API_TOKEN}`,
    },
  }

  return await axios.get(url, config)
}

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
