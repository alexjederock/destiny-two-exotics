
const models = require('../models')

const getAllExotics = async (request, response) => {
  try {
    const exotics = await models.Exotics.findAll()

    return exotics
      ? response.send(exoticList)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to get exotics list, Please try again.')
  }
}

const getExoticByName = async (request, response) => {
  try {
    const { name } = request.params

    const exotic = await models.exotics.findOne({
      where: {
        name: { [models.Op.like]: `%${name}%` }
      },
      include: [{ model: models.exotics }]
    })

    return exotic
      ? response.send(exotic)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to get exotic by name, Please try again.')
  }
}

const getExoticsByType = async (request, response) => {
  try {
    const { type } = request.params

    const exotics = await models.exotics.findAll({
      where: { type }
    })

    return exotics
      ? response.send(exotics)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to get exotics by type, please try again.')
  }
}

const saveNewExotic = async (request, response) => {
  try {
    const { name, type, perk } = request.body
    let slug = name.toLowerCase().split(' ').join('-')

    if (!name || !type || !perk) {
      return response.sendStatus(400)
    }

    await models.Exotics.create({
      name, type, perk, slug
    })

    return response.status(201).send({ name, type, perk })
  } catch (error) {
    return response.status(500).send('Unable to save exotic, please try again')
  }
}

const patchExotic = async (request, response) => {
  try {
    const { name } = request.params

    const exotic = await models.Hunters.findOne({
      where: { name }
    })

    if (!exotic) return response.status(404).send('Unable to find exotic with that name.')

    await models.Exotics.update({
      perk: request.body
    },
      { where: { name } })

    return response.sendStatus(204)
  } catch (error) {
    return response.status(500).send('Unable to update exotic, please try again later.')
  }

}

const deleteExotic = async (request, response) => {
  try {
    const { name } = request.params

    const result = await models.Exotics.destroy({
      where: { name }
    })

    return result
      ? response.status(204).send('Exotic Removed.')
      : response.status(404).send('Unable to find Exotic with that tag.')
  } catch (error) {
    return response.status(500).send('Unable to delete exotic, please try again later.')
  }
}

module.exports = {
  getAllExotics, getExoticByName, getExoticsByType, saveNewExotic, patchExotic, deleteExotic
}

