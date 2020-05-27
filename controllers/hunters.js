
const models = require('../models')

const getAllHunters = async (request, response) => {
  try {
    const hunters = await models.Hunters.findAll()

    return hunters
      ? response.send(hunters)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to get Hunters list, Please try again.')
  }
}

const getHunterByTag = async (request, response) => {
  try {
    const { tag } = request.params

    const hunter = await models.Hunters.findOne({
      where: {
        tag: { [models.Op.like]: `%${tag}%` }
      },
      include: [{ model: models.Exotics }]
    })

    return hunter
      ? response.send(hunter)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to get Hunter by tag, Please try again.')
  }
}

const getHuntersBySubclass = async (request, response) => {
  try {
    const { subclass } = request.params

    const hunters = await models.Hunters.findAll({
      where: { subclass }
    })

    return hunters
      ? response.send(hunters)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to get Hunters by subclass, please try again.')
  }
}

const saveNewHunter = async (request, response) => {
  try {
    const {
      tag, subclass, grenades, tree, exotic
    } = request.body

    if (!tag || !subclass || !grenades || !tree || !exotic) {
      return response.sendStatus(400)
    }
    const exoticArmour = await models.Exotics.findOne({
      where: { name: exotic }
    })

    if (!exotic) {
      return response.status(400).send('No exotic by that name exists.')
    }
    await models.Hunters.create({
      tag, subclass, grenades, tree, exoticName: exoticArmour.name
    })

    return response.status(201).send({
      tag, subclass, grenades, tree, exotic: exoticArmour
    })
  } catch (error) {
    return response.status(500).send('Unable to save hunter, please try again')
  }
}

const patchHunter = async (request, response) => {
  try {
    const { tag } = request.params

    const hunter = await models.Hunters.findOne({
      where: { tag }
    })

    if (!hunter) return response.status(404).send('Unable to find Hunter with that tag.')

    await models.Hunters.update({
      perk: request.body
    },
      { where: { tag } })

    return response.sendStatus(204)
  } catch (error) {
    return response.status(500).send('Unable to update hunter, please try again later.')
  }

}

const deleteHunter = async (request, response) => {
  try {
    const { tag } = request.params

    const result = await models.Hunters.destroy({
      where: { tag }
    })

    return result
      ? response.status(204).send('Full on RTL, returned to Light.')
      : response.status(404).send('Unable to find Hunter with that tag.')
  } catch (error) {
    return response.status(500).send('Unable to delete hunter, please try again later.')
  }
}

module.exports = {
  getAllHunters, getHunterByTag, getHuntersBySubclass, saveNewHunter, patchHunter, deleteHunter
}
