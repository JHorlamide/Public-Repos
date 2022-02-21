const app = require('../../app')
const supertest = require('supertest')
const { expect } = require('chai')

const searchQuery = 'mongodb+srv'
const searchQuery2 = 'Test_search'
const sortField = 'stars'
const sortOrder = 'asc'
const sortOrder2 = ''
const itemPerPage = '5'
const currentPage = '1'

describe('Getting github repos', function () {
  let request = supertest.agent(app)
  this.timeout(10000)

  it('should allow a GET from /api/get-repos/:searchQuery/:sortField...', async function () {
    const res = await request
      .get(`/api/get-repos/${searchQuery}/${sortField}/${sortOrder}/${itemPerPage}/${currentPage}`)
      .send()

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body).not.to.be.empty
  })


  it("should disallow a GET from /api/get-repos/:searchQuery/:sortField.../ if searchQuery is not valid sortOrder is not specified", async function () {
    const res = await request
      .get(`/api/get-repos/${searchQuery2}/${sortField}/${sortOrder2}/${itemPerPage}/${currentPage}`)
      .send()

    expect(res.status).to.equal(404)
  })
})