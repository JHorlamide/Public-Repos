const app = require('../../app')
const supertest = require('supertest')
const { expect } = require('chai')

describe('Getting github repos', function () {
  let request = supertest.agent(app)

  it('should allow a GET from /get-repos/:searchQuery/:sortField...', async function () {
    const res = await request
      .get(
        '/get-repos/:searchQuery/:sortField/:sortOrder/:itemPerPage/:currentPage',
      )
      .query({ searchQuery: 'Test1' })
      .send()

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body).not.to.be.empty
  })
})
