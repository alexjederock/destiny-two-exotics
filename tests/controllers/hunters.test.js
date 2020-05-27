/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const {
  getAllHunters, getHunterByTag, getHuntersBySubclass,
  saveNewHunter, patchHunter, deleteHunter
} = require('../../controllers/hunters')
const models = require('../../models')
const {
  afterEach, before, beforeEach, after, describe, it
} = require('mocha')
const { singleHunter, hunterList } = require('../mocks/hunters')


chai.use(sinonChai)
const { expect } = chai

describe('Controllers - Hunters', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedUpdate
  let stubbedDestroy
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend


  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Hunters, 'findAll')
    stubbedFindOne = sandbox.stub(models.Hunters, 'findOne')
    stubbedCreate = sandbox.stub(models.Hunters, 'create')
    stubbedUpdate = sandbox.stub(models.Hunters, 'update')
    stubbedDestroy = sandbox.stub(models.Hunters, 'destroy')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })


  describe('getAllHunters', () => {
    it('retrieves a list of hunters from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(hunterList)

      await getAllHunters({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(hunterList)
    })

    it('returns a 500 status when an error occurs retrieving the teams', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllHunters({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to get Hunters list, Please try again.')
    })
  })

  describe('getHunterByTag', () => {
    it('retrieves the hunter associated with the provided tag from the database and calls response.send() with it', async () => {
      const request = { params: { tag: 'hunterdude' } }

      stubbedFindOne.returns(singleHunter)

      await getHunterByTag(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          tag: { [models.Op.like]: '%hunterdude%' }
        },
        include: [{ model: models.Exotics }]
      })
      expect(stubbedSend).to.have.been.calledWith(singleHunter)
    })

    it('returns a 404 status when no hunter is found', async () => {
      const request = { params: { tag: 'fuzzball' } }

      stubbedFindOne.returns(null)

      await getHunterByTag(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          tag: { [models.Op.like]: '%hunterdude%' }
        },
        include: [{ model: models.Exotics }]
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs retrieving the hunter by tag', async () => {
      const request = { params: { tag: 'taco-party' } }

      stubbedFindOne.throws('ERROR!')

      await getHunterByTag(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          tag: { [models.Op.like]: '%hunterdude%' }
        },
        include: [{ model: models.Exotics }]
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to get Hunter by tag, Please try again.')
    })
  })

  describe('getHuntersBySubclass', () => {
    it('retrieves all the hunters associated with the provided subclass from the database and calls response.send() with it', async () => {
      const request = { params: { subclass: 'Gunslinger' } }

      stubbedFindAll.returns(hunterList)

      await getHuntersBySubclass(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: { subclass: 'Gunslinger' }
      })
      expect(stubbedSend).to.have.been.calledWith(hunterList)
    })

    it('returns a 404 status when no hunters with given subclass are found.', async () => {
      const request = { params: { subclass: 'Stoneflipper' } }

      stubbedFindAll.returns(null)

      await getHuntersBySubclass(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: { subclass: 'Stoneflipper' }
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs retrieving the hunters by subclass', async () => {
      const request = { params: { subclass: 'Candywrappers' } }

      stubbedFindAll.throws('ERROR!')

      await getHuntersBySubclass(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: { subclass: 'Candywrappers' }
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to get Hunters by subclass, please try again.')
    })
  })

  describe('saveNewHunter', () => {
    it('accepts new hunter details and saves them as a new hunter in the database, returning the saved record with a 201 status', async () => {
      const request = { body: singleHunter }

      stubbedCreate.returns(singleHunter)

      await saveNewHunter(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleHunter)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleHunter)
    })

    it('returns a 400 status when not all required fields are provided (missing location)', async () => {
      const request = { body: singleHunter }

      await saveNewHunter(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedSendStatus).to.have.been.calledWith(400)
    })

    it('returns a 500 status when an error occurs saving the new hunter', async () => {
      const request = { body: singleHunter }

      stubbedCreate.throws('ERROR!')

      await saveNewHunter(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleHunter)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save hunter, please try again')
    })
  })


  describe('patchHunter', () => {
    it('accepts new hunter details and updates a current hunter in the database, returning the saved record with a 204 status', async () => {
      const request = { body: singleHunter }

      stubbedUpdate.returns(singleHunter)

      await patchHunter(request, response)

      expect(stubbedUpdate).to.have.been.calledWith(singleHunter)
      expect(stubbedStatus).to.have.been.calledWith(204)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleHunter)
    })

    it('returns a 404 status when hunter is not found', async () => {
      const request = { body: singleHunter }

      await patchHunter(request, response)

      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to find Hunter with that tag.')
    })

    it('returns a 500 status when an error occurs saving the new hunter data', async () => {
      const request = { body: singleHunter }

      stubbedUpdate.throws('ERROR!')

      await patchHunter(request, response)

      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to update hunter, please try again later.')
    })
  })

  describe('deleteHunter', () => {
    it('removes a current hunter from the database, and returns a 204 status with a message', async () => {
      const request = { body: singleHunter }

      stubbedDestroy.returns(singleHunter)

      await deleteHunter(request, response)

      expect(stubbedDestroy).to.have.been.calledWith(singleHunter)
      expect(stubbedStatus).to.have.been.calledWith(204)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleHunter)
    })

    it('returns a 404 status when a hunter is not found', async () => {
      const request = { body: singleHunter }

      await deleteHunter(request, response)

      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs deleting the hunter', async () => {
      const request = { body: singleHunter }

      stubbedDestroy.throws('ERROR!')

      await deleteHunter(request, response)

      expect(stubbedDestroy).to.have.been.calledWith(singleHunter)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete hunter, please try again later.')
    })
  })
})
