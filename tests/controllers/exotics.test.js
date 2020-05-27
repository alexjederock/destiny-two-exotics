/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const {
  getAllExotics, getExoticByName, getExoticsByType,
  saveNewExotic, patchExotic, deleteExotic
} = require('../../controllers/Exotics')
const models = require('../../models')
const {
  afterEach, before, beforeEach, after, describe, it
} = require('mocha')
const { singleExotic, exoticList } = require('../mocks/Exotics')


chai.use(sinonChai)
const { expect } = chai

describe('Controllers - Exotics', () => {
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

    stubbedFindAll = sandbox.stub(models.Exotics, 'findAll')
    stubbedFindOne = sandbox.stub(models.Exotics, 'findOne')
    stubbedCreate = sandbox.stub(models.Exotics, 'create')
    stubbedUpdate = sandbox.stub(models.Exotics, 'update')
    stubbedDestroy = sandbox.stub(models.Exotics, 'destroy')

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


  describe('getAllExotics', () => {
    it('retrieves a list of Exotics from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(exoticList)

      await getAllExotics({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(exoticList)
    })

    it('returns a 500 status when an error occurs retrieving the exotics', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllExotics({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to get exotics list, Please try again.')
    })
  })

  describe('getExoticByName', () => {
    it('retrieves the Exotic associated with the provided name from the database and calls response.send() with it', async () => {

      const request = { params: { name: 'Knucklehead-Radar' } }

      stubbedFindOne.returns(singleExotic)

      await getExoticByName(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          name: { [models.Op.like]: '%Knucklehead-Radar%' }
        },
        include: [{ model: models.Exotics }]
      })
      expect(stubbedSend).to.have.been.calledWith(singleExotic)
    })

    it('returns a 404 status when no Exotic is found', async () => {
      const request = { params: { name: 'Insurmountable-Skullfort' } }

      stubbedFindOne.returns(null)

      await getExoticByName(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          name: { [models.Op.like]: '%Ashen-Wake%' }
        },
        include: [{ model: models.Exotics }]
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs retrieving the Exotic by name', async () => {
      const request = { params: { name: '' } }

      stubbedFindOne.throws('ERROR!')

      await getExoticByName(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          name: { [models.Op.like]: '%Ashen-Wake%' }
        },
        include: [{ model: models.Exotics }]
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to get exotic by name, Please try again.')
    })
  })

  describe('getExoticsByType', () => {
    it('retrieves all the Exotics associated with the provided type from the database and calls response.send() with it', async () => {

      const request = { params: { type: 'Chest-armor' } }

      stubbedFindAll.returns(ExoticList)

      await getExoticsByType(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: { type: 'Chest-armor' }
      })
      expect(stubbedSend).to.have.been.calledWith(ExoticList)
    })

    it('returns a 404 status when no Exotics with given type are found.', async () => {
      const request = { params: { type: 'Nose-guard' } }

      stubbedFindAll.returns(null)

      await getExoticsByType(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: { type: 'Nose-guard' }
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs retrieving the Exotics by type', async () => {
      const request = { params: { type: 'Knee-pads' } }

      stubbedFindAll.throws('ERROR!')

      await getExoticsByType(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: { type: 'Knee-pads' }
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to get exotics by type, please try again.')
    })
  })

  describe('saveNewExotic', () => {
    it('accepts new villain details and saves them as a new villain in the database, returning the saved record with a 201 status', async () => {
      const request = { body: singleExotic }

      stubbedCreate.returns(singleExotic)

      await saveNewExotic(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleExotic)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleExotic)
    })

    it('returns a 400 status when not all required fields are provided (missing location)', async () => {

      const request = { body: singleExotic }

      await saveNewExotic(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedSendStatus).to.have.been.calledWith(400)
    })

    it('returns a 500 status when an error occurs saving the new Exotic', async () => {
      const request = { body: singleExotic }

      stubbedCreate.throws('ERROR!')

      await saveNewExotic(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleExotic)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save Exotic, please try again')
    })
  })

  describe('patchExotic', () => {
    it('accepts new exotic perk details and updates a current hunter in the database, returning the saved record with a 204 status', async () => {
      const request = { body: { perk: 'Upgraded Sensor Pack; Provides radar while your aiming, enhanced radar while crouching.' } }

      stubbedUpdate.returns(singleExotic)

      await patchExotic(request, response)

      expect(stubbedUpdate).to.have.been.calledWith(singleExotic)
      expect(stubbedStatus).to.have.been.calledWith(204)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleExotic)
    })

    it('returns a 404 status when hunter is not found', async () => {
      const request = { body: singleExotic }

      await patchExotic(request, response)

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

  describe('deleteExotic', () => {
    it('removes a current hunter from the database, and returns a 204 status with a message', async () => {
      const request = { body: singleExotic }

      stubbedDestroy.returns(singleExotic)

      await deleteExotic(request, response)

      expect(stubbedDestroy).to.have.been.calledWith(singleExotic)
      expect(stubbedStatus).to.have.been.calledWith(204)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleExotic)
    })

    it('returns a 404 status when a exotic is not found', async () => {
      const request = { body: singleExotic }

      await deleteExotic(request, response)

      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs deleting the exotic', async () => {
      const request = { body: singleExotic }

      stubbedDestroy.throws('ERROR!')

      await deleteExotic(request, response)

      expect(stubbedDestroy).to.have.been.calledWith(singleExotic)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete exotic, please try again later.')
    })
  })
})


